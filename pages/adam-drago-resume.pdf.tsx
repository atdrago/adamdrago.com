import type { GetServerSideProps } from "next";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer";

const getBrowserInstance = async (): Promise<
  Awaited<
    ReturnType<typeof chromium.puppeteer.launch | typeof puppeteer.launch>
  >
> => {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    return await puppeteer.launch({
      args: chromium.args,
      headless: true,
    });
  }

  return await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const browser = await getBrowserInstance();

  const page = await browser.newPage();

  await page.goto(process.env.RESUME_URL, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({ format: "a4" });

  await browser.close();

  res.setHeader("Content-Type", "application/pdf; charset=utf-8");
  res.setHeader("Content-Length", pdf.length);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="adam-drago-resume.pdf"`
  );
  res.write(pdf);
  res.end();

  return {
    props: {},
  };
};

export default function ResumePdf(): null {
  return null;
}
