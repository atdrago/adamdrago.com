/**
 * This file was lifted mostly from @BetaHuhn's vercel-pdf-convert
 * @see https://github.com/BetaHuhn/vercel-pdf-converter/blob/3c8d3681bed003964114d35556d8ef0ce66b48cf/service/convert.js
 *
 * Also, @see https://github.com/berstend/puppeteer-extra/issues/93#issuecomment-712364816
 */

import chrome from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

// Path to chrome executable on different platforms
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

export const getOptions = async () => {
  if (process.env.CI || process.env.VERCEL) {
    // In CI, use the path of chrome-aws-lambda and its args
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  // During development use local chrome executable
  return {
    args: [],
    executablePath:
      chromeExecutables[process.platform] || chromeExecutables.linux,
    headless: true,
  };
};

const cdnFontsPath =
  "https://rawcdn.githack.com/atdrago/adamdrago.com/08010147dca5213fe14ccf62c7e3369702191fca/fonts";

const courierNewPath = `${cdnFontsPath}/${encodeURIComponent(
  "Courier New.ttf"
)}`;
const courierNewBoldPath = `${cdnFontsPath}/${encodeURIComponent(
  "Courier New Bold.ttf"
)}`;
const courierNewItalicPath = `${cdnFontsPath}/${encodeURIComponent(
  "Courier New Italic.ttf"
)}`;

function log(verbose: boolean, ...args: any) {
  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export const getPdf = async (url: string, verbose = false) => {
  // Load the fonts that are used on the site. This must be done before
  // puppeteer.launch(...) is called below.
  log(verbose, "Loading fonts...");
  await chrome.font(courierNewPath);
  await chrome.font(courierNewBoldPath);
  await chrome.font(courierNewItalicPath);

  // Start headless chrome instance
  log(verbose, "Starting chrome...");
  const options = await getOptions();
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();

  // Visit URL and wait until everything is loaded (available events: load,
  // domcontentloaded, networkidle0, networkidle2)
  log(verbose, `Visiting "${url}" ...`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

  // Tell Chrome to generate the PDF
  await page.emulateMediaType("print");

  log(verbose, "Generating PDF...");
  const buffer = await page.pdf({
    format: "a4",
    displayHeaderFooter: false,
    margin: {
      top: 75,
      bottom: 75,
      left: 70,
      right: 70,
    },
  });

  log(verbose, "Closing page...");
  await page.close();

  log(verbose, "Closing chrome...");
  await browser.close();

  log(verbose, "Done");

  return buffer;
};
