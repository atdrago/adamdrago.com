import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { MoonStars, Sun } from "phosphor-react";

import { GitHubLogo } from "components/GitHubLogo";
import { SelectField } from "components/SelectField";
import { useColorSchemeContext } from "contexts/ColorSchemeContext";

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
  const router = useRouter();
  const { colorScheme, computedColorScheme, setColorScheme } =
    useColorSchemeContext();

  return (
    <header className="flex flex-col gap-3 lg:gap-4 text-black dark:text-neutral-100 transition-colors">
      <SelectField
        className={
          "absolute top-0 left-0 w-min leading-none print:hidden text-stone-600 dark:text-yellow-100"
        }
        aria-label={`${computedColorScheme} color scheme`}
        label={
          computedColorScheme === "dark" ? (
            <MoonStars weight="bold" height="28" width="28" />
          ) : (
            <Sun weight="bold" height="28" width="28" />
          )
        }
        value={colorScheme}
        onChange={(event) => {
          setColorScheme(event.target.value);
        }}
      >
        <option value="dark">dark</option>
        <option value="light">light</option>
        <option value="system">system</option>
      </SelectField>
      <h1 className="text-5xl lg:text-7xl font-bold">Adam Drago</h1>
      <nav className="print:hidden flex flex-col gap-3 lg:gap-4">
        <ul className="flex gap-4 lg:gap-8">
          {routes.map(({ name, href }) => (
            <li key={href}>
              <Link href={href}>
                <a
                  className={
                    router.pathname === href
                      ? "text-3xl lg:text-4xl font-bold"
                      : "text-3xl lg:text-4xl"
                  }
                >
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <Link href="https://github.com/atdrago">
              <a
                target="_blank"
                className="text-stone-600 dark:text-stone-300 h-7 w-7 block"
                rel="noreferrer noopener"
              >
                <GitHubLogo />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
