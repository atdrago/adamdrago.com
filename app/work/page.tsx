import Link from "next/link";

import { FileArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import resumeData from "app/(lib)/data/resume";

const updatedAt = Intl.DateTimeFormat([], { dateStyle: "full" })
  .format(new Date(resumeData.updatedAt))
  .toString();

export default function WorkPage() {
  return (
    <main className="prose prose-lg print:prose-sm dark:prose-invert">
      <aside className="print:hidden">
        <p
          className="
            bg-neutral-50 dark:bg-neutral-900
            border border-neutral-100 dark:border-neutral-800
            px-3 py-2 text-lg transition-colors
          "
        >
          The following is my resume, updated as of <b>{updatedAt}</b>. It is
          also available to{" "}
          <Link
            download="adam-drago-resume.pdf"
            target="_blank"
            href={`/adam-drago-resume.pdf`}
          >
            download as a PdddDF
          </Link>{" "}
          or{" "}
          <Link
            download="adam-drago-resume.txt"
            target="_blank"
            href={`/adam-drago-resume.txt`}
          >
            text file
          </Link>{" "}
          if that is more convenient.
        </p>
      </aside>
      {resumeData.sections.map(({ heading, items }, sectionIndex) => {
        return (
          <section key={sectionIndex}>
            {heading ? (
              <h2 className="font-bold sticky top-0 bg-white dark:bg-black z-10 transition-colors">
                {heading}
              </h2>
            ) : null}
            {items?.map((item, itemIndex) => {
              if (item.kind === "paragraph") {
                const content = item.content;

                return (
                  <p key={itemIndex} className="">
                    {content}
                  </p>
                );
              }

              if (item.kind === "section") {
                const content = item.content;

                return (
                  <section key={itemIndex}>
                    {content.heading ? (
                      <h3 className="font-bold sticky top-9 bg-white dark:bg-black transition-colors">
                        {content.heading}
                      </h3>
                    ) : null}
                    {content.subheading ? (
                      <h4 className="">{content.subheading}</h4>
                    ) : null}
                    {content.comment ? (
                      <p className="italic">{content.comment}</p>
                    ) : null}
                    {content.items?.map((subItem, subItemIndex) => {
                      if (subItem.kind === "list") {
                        return (
                          <ul key={subItemIndex} className="" role="list">
                            {subItem.items?.map((listItem, listItemIndex) => {
                              return (
                                <li
                                  className={
                                    listItem.style === "bold" ? "font-bold" : ""
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
        <h2 className="font-bold sticky top-0 bg-white dark:bg-black z-10 transition-colors">
          Downloads
        </h2>
        <div className="flex items-start gap-6">
          <Link
            className="rounded-lg p-3 pr-4 bg-sky-500 text-white font-bold no-underline flex gap-2 items-center"
            download="adam-drago-resume.txt"
            target="_blank"
            href={`/adam-drago-resume.txt`}
          >
            <FileArrowDownIcon size={32} /> TXT
          </Link>
          <Link
            className="rounded-lg p-3 pr-4 bg-sky-500 text-white font-bold no-underline flex gap-2 items-center"
            download="adam-drago-resume.pdf"
            target="_blank"
            href={`/adam-drago-resume.pdf`}
          >
            <FileArrowDownIcon size={32} /> PDF
          </Link>
        </div>
      </section>
    </main>
  );
}
