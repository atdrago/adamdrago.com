/**
 * PDF generation utility using Puppeteer and Chromium.
 *
 * Uses @sparticuz/chromium-min in CI/Vercel environments, which downloads
 * the Chromium binary from a hosted URL at runtime (smaller package size).
 * Uses local Chrome installation for local development.
 *
 * Pattern adapted from:
 * @see https://github.com/gabenunez/puppeteer-on-vercel/blob/main/app/api/screenshot/route.ts
 *
 * NOTE: This is used as a BUILD SCRIPT (via scripts/buildResumePdf.ts),
 * not as an API route. The PDF is generated at build time.
 */

import type { Browser, LaunchOptions } from "puppeteer-core";

// URL to the Chromium binary package hosted in /public
// Download the appropriate version from https://github.com/Sparticuz/chromium/releases
// and place it in the /public directory as chromium-pack.tar
const CHROMIUM_PACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
  : "https://github.com/AdrianMrn/chromium-packed/raw/refs/heads/main/chromium-v143.0.0-pack.tar";

// Path to chrome executable on different platforms (for local development)
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

// Cache the Chromium executable path to avoid re-downloading on subsequent calls
// Note that in CI/Vercel, this won't actually matter much since the environment
// is ephemeral, but this allows the same code to be used as a route if I ever
// want to add that in the future.
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

/**
 * Downloads and caches the Chromium executable path.
 * Uses a download promise to prevent concurrent downloads.
 */
async function getChromiumPath(): Promise<string> {
  // Return cached path if available
  if (cachedExecutablePath) return cachedExecutablePath;

  // Prevent concurrent downloads by reusing the same promise
  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium
      .executablePath(CHROMIUM_PACK_URL)
      .then((path: string) => {
        cachedExecutablePath = path;
        // eslint-disable-next-line no-console
        console.log("Chromium path resolved:", path);

        return path;
      })
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error("Failed to get Chromium path:", error);
        downloadPromise = null; // Reset on error to allow retry
        throw error;
      });
  }

  return downloadPromise;
}

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
    // CI/Vercel: Use puppeteer-core with chromium-min (downloads binary from URL)
    log(verbose, "CI environment detected, using chromium-min...");
    const chromium = (await import("@sparticuz/chromium-min")).default;
    const puppeteer = (await import("puppeteer-core")).default;
    const executablePath = await getChromiumPath();

    const launchOptions: LaunchOptions = {
      args: chromium.args,
      executablePath,
      headless: true,
    };

    log(verbose, "Starting chrome with executable path:", executablePath);
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
