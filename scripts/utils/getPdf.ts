/**
 * PDF generation utility using Puppeteer and Chromium.
 *
 * Uses @sparticuz/chromium in CI/Vercel build environments (full package with
 * bundled binary). Uses local Chrome installation for local development.
 *
 * NOTE: This is used as a BUILD SCRIPT (via scripts/buildResumePdf.ts),
 * not as an API route. The PDF is generated at build time. For runtime API
 * routes, consider using @sparticuz/chromium-min with a hosted binary instead.
 *
 * @see https://github.com/Sparticuz/chromium
 */

import type { Browser, LaunchOptions } from "puppeteer-core";

// Path to chrome executable on different platforms (for local development)
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

function log(shouldLog: boolean, ...args: unknown[]) {
  if (shouldLog) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

export const getPdf = async (url: string, verbose = false) => {
  log(true, "\nBuilding PDF...");

  const isCI = !!(process.env.CI || process.env.VERCEL);

  let browser: Browser;

  if (isCI) {
    // CI/Vercel build: Use @sparticuz/chromium directly (full package)
    log(verbose, "CI environment detected, using @sparticuz/chromium...");
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = (await import("puppeteer-core")).default;

    // Fixes issue where calling `browser.close()` hangs. See:
    // https://github.com/Sparticuz/chromium/issues/85#issuecomment-1527692751
    chromium.setGraphicsMode = false;

    const launchOptions: LaunchOptions = {
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    };

    log(verbose, "Starting chrome...");
    browser = await puppeteer.launch(launchOptions);
  } else {
    // Local development: Use puppeteer-core with local Chrome installation
    log(verbose, "Local environment detected, using local Chrome...");
    const puppeteer = (await import("puppeteer-core")).default;

    const launchOptions: LaunchOptions = {
      args: [],
      executablePath:
        chromeExecutables[process.platform] || chromeExecutables.linux,
      headless: true,
    };

    log(verbose, "Starting chrome...");
    browser = await puppeteer.launch(launchOptions);
  }

  try {
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

    log(true, "Done building PDF!");

    return buffer;
  } finally {
    // Always clean up browser resources
    log(verbose, "Closing chrome...");
    await browser.close();
  }
};
