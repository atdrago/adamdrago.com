/**
 * This file was lifted mostly from @BetaHuhn's vercel-pdf-convert
 * @see https://github.com/BetaHuhn/vercel-pdf-converter/blob/3c8d3681bed003964114d35556d8ef0ce66b48cf/service/convert.js
 *
 * Also, @see https://github.com/berstend/puppeteer-extra/issues/93#issuecomment-712364816
 */

import { access, cp, mkdir, readdir } from "fs/promises";
import { join } from "path";

import chrome from "@sparticuz/chromium";
import puppeteer, { type LaunchOptions } from "puppeteer-core";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
}

// Path to chrome executable on different platforms
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

const getOptions = async (): Promise<LaunchOptions> => {
  if (process.env.CI || process.env.VERCEL) {
    // In CI, use the path of chrome-aws-lambda and its args
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath(),
      headless: "shell",
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

function log(shouldLog: boolean, ...args: any) {
  if (shouldLog) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export const getPdf = async (url: string, verbose = false) => {
  log(true, "\nBuilding PDF...");

  // Fixes issue where calling `chrome.close()` hangs. See:
  // https://github.com/Sparticuz/chromium/issues/85#issuecomment-1527692751
  // This also turns off WebGL and may have other side effects related to
  // graphics, but also may speed up initial browser launch time.
  // An alternative solution to chrome hanging is to close all windows before
  // closing the browser. See:
  // https://github.com/puppeteer/puppeteer/issues/7922#issuecomment-1549052725
  chrome.setGraphicsMode = false;

  // In Vercel/CI, fonts must be in specific directories for chromium to find them.
  // The fonts.conf in @sparticuz/chromium looks for fonts in:
  // /var/task/.fonts, /var/task/fonts, /opt/fonts, /tmp/fonts
  // During Vercel builds, the working directory is /vercel/path0/, not /var/task/.
  // So we copy fonts to /tmp/fonts which is always accessible.
  // See: https://github.com/Sparticuz/chromium/issues/333
  if (process.env.CI || process.env.VERCEL) {
    const fontsSource = join(process.cwd(), "fonts");
    const fontsDest = "/tmp/fonts";

    const sourceExists = await exists(fontsSource);
    const sourceHasFiles =
      sourceExists && (await readdir(fontsSource)).length > 0;

    if (sourceHasFiles) {
      log(verbose, `Copying fonts from ${fontsSource} to ${fontsDest}...`);

      if (!(await exists(fontsDest))) {
        log(
          verbose,
          `Font destination ${fontsDest} does not exist, creating...`,
        );
        await mkdir(fontsDest, { recursive: true });
      } else {
        log(verbose, `Font destination ${fontsDest} already exists.`);
      }

      await cp(fontsSource, fontsDest, { recursive: true });
      log(verbose, "Fonts copied successfully.");
    } else {
      log(
        verbose,
        `No fonts folder found at ${fontsSource}, fonts will not be copied.`,
      );
    }
  }

  // Start headless chrome instance
  log(verbose, "Starting chrome...");
  const options = await getOptions();
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  // Visit URL and wait until everything is loaded (available events: load,
  // domcontentloaded, networkidle0, networkidle2)
  log(verbose, `Visiting "${url}"...`);

  await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

  log(verbose, "Emulating print media...");

  await page.emulateMediaType("print");

  log(verbose, "Generating PDF...");
  // Tell Chrome to generate the PDF
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

  log(verbose, "Closing chrome...");
  await browser.close();

  log(true, "Done building PDF!");

  return buffer;
};
