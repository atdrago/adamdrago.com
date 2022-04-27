import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="font-serif bg-white dark:bg-black transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
