import Link from "next/link";
import { FileArrowDown } from "phosphor-react";

import { Header } from "components/Header";
import resumeData from "data/resume";

const updatedAt = Intl.DateTimeFormat([], { dateStyle: "full" })
  .format(new Date(resumeData.updatedAt))
  .toString();

const updatedAtSearchParam = resumeData.updatedAt.replace(/\//g, "-");

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <main className="prose lg:prose-xl dark:prose-invert">
        <aside className="print:hidden">
          <p className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 px-3 py-2 text-lg transition-colors">
            The following is my resumé, updated as of <b>{updatedAt}</b>. It is
            also available to{" "}
            <Link href={`/adam-drago-resume.pdf?date=${updatedAtSearchParam}`}>
              <a download="adam-drago-resume.pdf" target="_blank">
                download as a PDF
              </a>
            </Link>{" "}
            or{" "}
            <Link href={`/adam-drago-resume.txt?date=${updatedAtSearchParam}`}>
              <a download="adam-drago-resume.txt" target="_blank">
                text file
              </a>
            </Link>{" "}
            if that is more convenient.
          </p>
        </aside>
        {resumeData.sections.map(({ heading, items }, sectionIndex) => {
          return (
            <section key={sectionIndex}>
              {heading ? (
                <h2 className="text-3xl font-bold sticky top-0 bg-white dark:bg-black z-10 transition-colors">
                  {heading}
                </h2>
              ) : null}
              {items?.map((item, itemIndex) => {
                if (item.kind === "paragraph") {
                  const content = item.content;

                  return (
                    <p key={itemIndex} className="text-lg">
                      {content}
                    </p>
                  );
                }

                if (item.kind === "section") {
                  const content = item.content;

                  return (
                    <section key={itemIndex}>
                      {content.heading ? (
                        <h3 className="text-2xl font-bold sticky top-9 bg-white dark:bg-black transition-colors">
                          {content.heading}
                        </h3>
                      ) : null}
                      {content.subheading ? (
                        <h4 className="text-xl">{content.subheading}</h4>
                      ) : null}
                      {content.comment ? (
                        <p className="italic">{content.comment}</p>
                      ) : null}
                      {content.items?.map((subItem, subItemIndex) => {
                        if (subItem.kind === "list") {
                          return (
                            <ul
                              key={subItemIndex}
                              className="text-lg"
                              role="list"
                            >
                              {subItem.items?.map((listItem, listItemIndex) => {
                                return (
                                  <li
                                    className={
                                      listItem.style === "bold"
                                        ? "font-bold"
                                        : ""
                                    }
                                    key={listItemIndex}
                                  >
                                    {listItem.content}
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        }

                        return null;
                      })}
                    </section>
                  );
                }
              })}
            </section>
          );
        })}
        <section className="pb-8 print:hidden">
          <h2 className="text-3xl font-bold sticky top-0 bg-white dark:bg-black z-10 transition-colors">
            Downloads
          </h2>
          <div className="flex items-start gap-6">
            <Link href={`/adam-drago-resume.txt?date=${updatedAtSearchParam}`}>
              <a
                className="rounded-lg p-3 pr-4 bg-sky-500 text-white font-bold no-underline flex gap-2 items-center"
                download="adam-drago-resume.txt"
                target="_blank"
              >
                <FileArrowDown size={32} /> TXT
              </a>
            </Link>
            <Link href={`/adam-drago-resume.pdf?date=${updatedAtSearchParam}`}>
              <a
                className="rounded-lg p-3 pr-4 bg-sky-500 text-white font-bold no-underline flex gap-2 items-center"
                download="adam-drago-resume.pdf"
                target="_blank"
              >
                <FileArrowDown size={32} /> PDF
              </a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
