import "styles/globals.css";

import { Backgrounds } from "components/Backgrounds";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="font-serif bg-white dark:bg-black transition-colors">
        <Backgrounds />
        <div
          className={`
            absolute left-0 right-0 top-2/3 print:top-0
            mx-auto px-8
            font-serif max-w-prose
          `}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
