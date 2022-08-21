/**
 * This file was lifted mostly from @BetaHuhn's vercel-pdf-convert
 * @see https://github.com/BetaHuhn/vercel-pdf-converter/blob/3c8d3681bed003964114d35556d8ef0ce66b48cf/service/convert.js
 *
 * Also, @see https://github.com/berstend/puppeteer-extra/issues/93#issuecomment-712364816
 */

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import fs from "node:fs";

// Path to chrome executable on different platforms
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

export const getOptions = async () => {
  // During development use local chrome executable
  if (process.env.NODE_ENV === "development") {
    return {
      args: [],
      executablePath:
        chromeExecutables[process.platform] || chromeExecutables.linux,
      headless: true,
    };
  }

  // Else, use the path of chrome-aws-lambda and its args
  return {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  };
};

export const getPdf = async (url: string) => {
  console.log(
    await chrome.font(
      "https://raw.githack.com/atdrago/adamdrago.com/fix/pdf-resume/fonts/Courier%20New.ttf"
    )
  );

  // Start headless chrome instance
  const options = await getOptions();
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();

  // Visit URL and wait until everything is loaded (available events: load,
  // domcontentloaded, networkidle0, networkidle2)
  await page.goto(url, { waitUntil: "networkidle0", timeout: 8000 });

  // Scroll to bottom of page to force loading of lazy loaded images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve(null);
        }
      }, 5);
    });
  });

  // Tell Chrome to generate the PDF
  await page.emulateMediaType("print");
  const buffer = await page.pdf({
    format: "a4",
    displayHeaderFooter: true,
    headerTemplate: "",
    footerTemplate: "",
  });

  // Close chrome instance
  await browser.close();

  return buffer;
};
