import type { GetServerSideProps } from "next";

import { getPdf } from "lib/server/getPdf";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pdf = await getPdf(process.env.RESUME_URL);

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