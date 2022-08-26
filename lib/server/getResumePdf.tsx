import fs from "node:fs";

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import ReactDom from "react-dom/server";

import { Layout } from "components/Layout";
import WorkPage from "pages/work";

// Path to chrome executable on different platforms
// @see https://github.com/BetaHuhn/vercel-pdf-converter/blob/3c8d3681bed003964114d35556d8ef0ce66b48cf/service/convert.js
const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
  linux: "/usr/bin/chromium-browser",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

// @see https://github.com/BetaHuhn/vercel-pdf-converter/blob/3c8d3681bed003964114d35556d8ef0ce66b48cf/service/convert.js
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

export const getResumePdf = async () => {
  // Load the fonts that are used on the site. This must be done before
  // puppeteer.launch(...) is called below.
  await chrome.font(courierNewPath);
  await chrome.font(courierNewBoldPath);
  await chrome.font(courierNewItalicPath);

  // Start headless chrome instance
  const options = await getOptions();
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();

  // Set the page's content to the /work page's static HTML markup
  await page.setContent(
    ReactDom.renderToStaticMarkup(
      <Layout page="work">
        <WorkPage />
      </Layout>
    )
  );

  // Attempt to load CSS
  try {
    const buildManifest = fs
      .readFileSync(".next/build-manifest.json")
      .toString();

    if (buildManifest) {
      const buildManifestJson = JSON.parse(buildManifest);

      const appFiles = buildManifestJson?.pages?.["/_app"];

      await Promise.all(
        appFiles.map((path: unknown) => {
          if (typeof path === "string" && path.endsWith(".css")) {
            return page.addStyleTag({ path: `.next/${path}` });
          }

          return Promise.resolve();
        })
      );
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(
      "Could not load CSS. This will only work in production. If you're trying" +
        "to run this with `npm run dev` try `npm run build && npm start` instead."
    );
  }

  await page.emulateMediaType("print");

  // Tell Chrome to generate the PDF
  const buffer = await page.pdf({
    format: "a4",
    displayHeaderFooter: false,
    margin: {
      top: 92,
      bottom: 92,
    },
  });

  // Close chrome instance
  await browser.close();

  return buffer;
};
