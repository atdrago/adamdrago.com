import type { GetServerSideProps } from "next";
import resume from "data/resume";

import type { ResumeItem } from "types";

const getTextForItem = (item: ResumeItem, level: number) => {
  const { kind } = item;

  const levelArr = Array.from({ length: level });
  const levelTabs = levelArr.map(() => "\t").join("");
  const levelNewLines = levelArr.map(() => "\n").join("") + "\n";

  switch (kind) {
    case "paragraph":
      return `${levelTabs}${item.content}${levelNewLines}`;
    case "section":
      const content = item.content;
      let section =
        "\n" +
        [content.heading, content.subheading, content.comment]
          .filter((str) => !!str)
          .map((str) => (str ? `\t${str}\n` : ""))
          .join("") +
        "\n";

      section +=
        content.items
          ?.map((subItem) => getTextForItem(subItem, level + 1))
          .join("") ?? "";

      return section;
    case "list":
      const { items } = item;

      return items
        ? items
            .map((listItem) => {
              const bullet = listItem.style === "bold" ? "*" : "-";

              return `${levelTabs}${bullet} ${listItem.content}`;
            })
            .join("\n") + "\n"
        : "";
    default:
      return "";
      break;
  }
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let result = "Adam Drago\n";

  resume.sections.forEach(({ heading, items }) => {
    result += `\n${heading}\n\n`;

    items?.forEach((item) => {
      result += getTextForItem(item, 1);
    });
  });

  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
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
