import { Header } from "components/Header";

import { Code, Heart, Peace } from "./client";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <main className="prose lg:prose-xl dark:prose-invert">
        <section>
          <p className="text-lg">
            Please email me at{" "}
            <a href="mailto:atdrago+business@gmail.com">atdrago@gmail.com</a>{" "}
            with any questions or inquiries. Thanks!
          </p>
          <p className="flex gap-2 text-stone-600 dark:text-stone-300">
            <Peace alt="peace" weight="bold" height="28" width="28" />
            <Heart alt="love" weight="bold" height="28" width="28" />
            <Code alt="code" weight="bold" height="28" width="28" />
          </p>
        </section>
      </main>
    </div>
  );
}
