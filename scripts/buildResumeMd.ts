/* eslint-disable no-console */
import { writeFile } from "fs";
import { resolve } from "path";

import resume from "../app/(lib)/data/resume.ts";
import type { ResumeItem } from "../types/index.ts";

const getMarkdownForItem = (item: ResumeItem): string => {
  const { kind } = item;

  switch (kind) {
    case "list": {
      const { items } = item;

      if (!items) {
        return "";
      }

      return (
        items.reduce((acc, listItem) => {
          const content =
            listItem.style === "bold"
              ? `**${listItem.content}**`
              : listItem.content;

          return acc + `- ${content}\n`;
        }, "") + "\n"
      );
    }
    case "paragraph": {
      return `${item.content}\n\n`;
    }
    case "section": {
      const content = item.content;
      let section = "";

      if (content.heading) {
        section += `### ${content.heading}\n\n`;
      }

      if (content.subheading) {
        section += `#### *${content.subheading}*\n\n`;
      }

      if (content.comment) {
        section += `*${content.comment}*\n\n`;
      }

      if (content.items) {
        section += content.items.reduce(
          (acc, subItem) => acc + getMarkdownForItem(subItem),
          "",
        );
      }

      return section;
    }
    default:
      return "";
  }
};

const result =
  "# Adam Drago\n\n" +
  resume.sections
    .map(
      ({ heading, items }) =>
        `## ${heading}\n\n${items?.reduce(
          (acc, item) => acc + getMarkdownForItem(item),
          "",
        )}`,
    )
    .join("");

const mdPath = resolve(process.cwd(), "public", "adam-drago-resume.md");
const mdTxtPath = resolve(process.cwd(), "public", "adam-drago-resume.md.txt");

let filesWritten = 0;
const totalFiles = 2;

const onFileWritten = (err: unknown, filename: string) => {
  if (err) {
    console.error(`writing ${filename} failed ${err}`);
    process.exit(1);
  }

  filesWritten++;

  if (filesWritten === totalFiles) {
    console.log("writing resume md files done\n");
    process.exit(0);
  }
};

writeFile(mdPath, result, (err: unknown) => onFileWritten(err, "resume.md"));
writeFile(mdTxtPath, result, (err: unknown) =>
  onFileWritten(err, "resume.md.txt"),
);
