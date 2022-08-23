import type { GetServerSideProps } from "next";
import resume from "data/resume";

import type { ResumeItem } from "types";

const getTextForItem = (item: ResumeItem, level: number) => {
  const { kind } = item;

  const levelArr = Array.from({ length: level });
  const levelTabs = levelArr.map(() => "\t").join("");
  const levelNewLines = levelArr.map(() => "\n").join("") + "\n";

  switch (kind) {
    case "list": {
      const { items } = item;

      if (!items) {
        return "";
      }

      return items.reduce((acc, listItem) => {
        const bullet = listItem.style === "bold" ? "*" : "-";

        return acc + `${levelTabs}${bullet} ${listItem.content}\n`;
      }, "");
    }
    case "paragraph": {
      return `${levelTabs}${item.content}${levelNewLines}`;
    }
    case "section": {
      const content = item.content;

      let section =
        [content.heading, content.subheading, content.comment].reduce(
          (acc = "", str) => (str ? acc + `\t${str}\n` : acc),
          ""
        ) + "\n";

      if (content.items) {
        section += content.items.reduce(
          (acc, subItem) => acc + getTextForItem(subItem, level + 1),
          ""
        );
      }

      section += "\n";

      return section;
    }
    default:
      return "";
  }
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const result =
    "Adam Drago\n" +
    resume.sections
      .map(
        ({ heading, items }) =>
          `\n${heading}\n\n${items?.reduce(
            (acc, item) => acc + getTextForItem(item, 1),
            ""
          )}`
      )
      .join("");

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
