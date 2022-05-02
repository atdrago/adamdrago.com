import { Header } from "components/Header";
import Link from "next/link";
import resumeData from "data/resume";

const h2ClassName =
  "text-3xl font-bold sticky top-0 bg-white dark:bg-black z-10 transition-colors";
const h3ClassName =
  "text-xl font-bold sticky top-9 bg-white dark:bg-black transition-colors";

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
              <h2 className={h2ClassName}>{heading}</h2>
              {items.map(({ kind, content }, index) => {
                if (kind === "paragraph") {
                  return (
                    <p key={index} className="text-lg">
                      {content}
                    </p>
                  );
                }

                if (kind === "section") {
                  return (
                    <section key={index}>
                      <h3 className={h3ClassName}>{content.heading}</h3>
                      {content.items.map(({ kind, items }, index) => {
                        if (kind === "list") {
                          return (
                            <ul key={index} className="text-lg" role="list">
                              {items.map(({ content, style }, index) => {
                                return (
                                  <li
                                    className={
                                      style === "bold" ? "font-bold" : ""
                                    }
                                    key={index}
                                  >
                                    {content}
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        }
                      })}
                    </section>
                  );
                }
              })}
            </section>
          );
        })}
        <section className="pb-8 print:hidden">
          <h2 className={h2ClassName}>Downloads</h2>
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
