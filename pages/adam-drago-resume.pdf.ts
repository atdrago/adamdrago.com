import type { GetServerSideProps } from "next";

import { getResumePdf } from "lib/server/getResumePdf";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pdf = await getResumePdf();

  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.setHeader("Content-Type", "application/pdf");
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
