"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Envelope, Link as LinkIcon, Phone } from "phosphor-react";

import { GitHubLogo } from "components/GitHubLogo";

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Work",
    href: "/work",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-3 lg:gap-4 text-stone-900 dark:text-stone-100 transition-colors">
      <h1 className="text-5xl lg:text-7xl print:text-3xl font-bold">
        Adam Drago
      </h1>
      <nav className="flex flex-col gap-3 lg:gap-4">
        <ul className="flex gap-4 lg:gap-8 print:hidden">
          {routes.map(({ name, href }) => (
            <li key={href}>
              <Link
                className={
                  pathname === href
                    ? "text-3xl lg:text-4xl font-bold"
                    : "text-3xl lg:text-4xl"
                }
                href={href}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex print:flex-col gap-2 mt-1">
          <li className="hidden print:inline">
            <Link
              className="
                flex gap-3
                text-stone-600 dark:text-stone-300
                items-center
                text-sm
              "
              href="https://adamdrago.com"
            >
              <LinkIcon className="h-7 w-7 print:h-5 print:w-5" />
              <span>adamdrago.com</span>
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              className="
                flex gap-3
                text-stone-600 dark:text-stone-300
                items-center
                text-sm
              "
              rel="noreferrer noopener"
              href="https://github.com/atdrago"
            >
              <GitHubLogo className="h-7 w-7 print:h-5 print:w-5" />
              <span className="hidden print:inline">github.com/atdrago</span>
            </Link>
          </li>
          <li className="hidden print:inline">
            <Link
              target="_blank"
              className="
                flex gap-3
                text-stone-600 dark:text-stone-300
                items-center
                text-sm
              "
              rel="noreferrer noopener"
              href="mailto:atdrago+business@gmail.com"
            >
              <Envelope className="h-7 w-7 print:h-5 print:w-5" />
              <span>atdrago@gmail.com</span>
            </Link>
          </li>
          <li className="hidden print:inline">
            <Link
              target="_blank"
              className="
                flex gap-3
                text-stone-600 dark:text-stone-300
                items-center
                text-sm
              "
              rel="noreferrer noopener"
              href="tel:16107623898"
            >
              <Phone className="h-7 w-7 print:h-5 print:w-5" />
              <span>(610) 762-3898</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
