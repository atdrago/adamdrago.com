import type { GetServerSideProps } from "next";
import resume from "data/resume";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let result = "";

  resume.sections.forEach(({ heading, items }) => {
    result += `\n${heading}\n\n`;

    items?.forEach((item) => {
      if (item.kind === "paragraph") {
        result += `\t${item.content}\n\n`;
      }

      if (item.kind === "section") {
        const content = item.content;
        result += `\t${content.heading}\n\n`;

        content.items?.forEach((subItem) => {
          if (subItem.kind === "list") {
            subItem.items?.forEach((listItem, index) => {
              if (listItem.style === "bold") {
                result += `\t\t* ${content}\n`;
              } else {
                result += `\t\t- ${content}\n`;
              }

              if (index === (subItem.items?.length ?? 0) - 1) {
                result += "\n";
              }
            });
          }
        });
      }
    });
  });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
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

export default function ResumeTxt(): null {
  return null;
}
