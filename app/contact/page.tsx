import { CodeIcon, HeartIcon, PeaceIcon } from "@phosphor-icons/react/dist/ssr";

export default function ContactPage() {
  return (
    <main className="prose lg:prose-xl dark:prose-invert">
      <section>
        <p className="text-lg">
          Please email me at{" "}
          <a href="mailto:atdrago+business@gmail.com">atdrago@gmail.com</a> with
          any questions or inquiries. Thanks!
        </p>
        <p className="flex gap-2 text-stone-600 dark:text-stone-300">
          <PeaceIcon alt="peace" weight="bold" height="28" width="28" />
          <HeartIcon alt="love" weight="bold" height="28" width="28" />
          <CodeIcon alt="code" weight="bold" height="28" width="28" />
        </p>
      </section>
    </main>
  );
}
