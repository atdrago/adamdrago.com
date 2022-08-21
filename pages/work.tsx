import { Header } from "components/Header";
import Link from "next/link";
import resumeData from "data/resume";

const updatedAt = Intl.DateTimeFormat([], { dateStyle: "full" })
  .format(new Date(resumeData.updatedAt))
  .toString();

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <main className="prose lg:prose-xl dark:prose-invert">
        <aside className="print:hidden">
          <p className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 px-3 py-2 text-lg transition-colors">
            The following is my resumé, updated as of <b>{updatedAt}</b>.
          </p>
        </aside>
        {resumeData.sections.map(({ heading, items }, index) => {
          return (
            <section key={index}>
              {heading ? (
                <h2 className="text-3xl font-bold sticky top-0 bg-white dark:bg-black z-10 transition-colors">
                  {heading}
                </h2>
              ) : null}
              {items?.map((item, index) => {
                if (item.kind === "paragraph") {
                  const content = item.content;

                  return (
                    <p key={index} className="text-lg">
                      {content}
                    </p>
                  );
                }

                if (item.kind === "section") {
                  const content = item.content;

                  return (
                    <section key={index}>
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
                      {content.items?.map((subItem, index) => {
                        if (subItem.kind === "list") {
                          return (
                            <ul key={index} className="text-lg" role="list">
                              {subItem.items?.map((listItem, index) => {
                                return (
                                  <li
                                    className={
                                      listItem.style === "bold"
                                        ? "font-bold"
                                        : ""
                                    }
                                    key={index}
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
          <div className="flex items-start gap-4">
            <Link href="/adam-drago-resume.txt">
              <a
                className="rounded-lg p-3 pr-4 bg-sky-500 text-white font-bold no-underline"
                download={true}
              >
                <span className="text-xl">⇣</span> Plain text file
              </a>
            </Link>
            <Link href="/adam-drago-resume.pdf">
              <a
                className="rounded-lg p-3 pr-4 bg-sky-500 text-white font-bold no-underline hidden"
                download={true}
              >
                <span className="text-xl">⇣</span> PDF file
              </a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
