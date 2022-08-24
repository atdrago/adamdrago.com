import { Head, Html, Main, NextScript } from "next/document";

/**
 * Document is only rendered on the server side, NOT on the client side
 */
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
