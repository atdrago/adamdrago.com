import type { NextApiHandler, GetServerSideProps } from "next";
import resume from "data/resume";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let result = "";

  resume.sections.forEach(({ heading, items }) => {
    result += `\n${heading}\n\n`;

    items.forEach(({ kind, content }) => {
      if (kind === "paragraph") {
        result += `\t${content}\n\n`;
      }

      if (kind === "section") {
        result += `\t${content.heading}\n\n`;

        content.items.forEach(({ kind, items }) => {
          if (kind === "list") {
            items.forEach(({ content, style }, index) => {
              if (style === "bold") {
                result += `\t\t* ${content}\n`;
              } else {
                result += `\t\t- ${content}\n`;
              }

              if (index === items.length - 1) {
                result += "\n";
              }
            });
          }
        });
      }
    });
  });

  res.setHeader("Content-Type", "text/plain");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="adam-drago-resume.txt"`
  );
  res.write(result);
  res.end();

  return {
    props: {},
  };
};

export default function Resume(): null {
  return null;
}
