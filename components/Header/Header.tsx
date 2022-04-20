import Link from "next/link";
import { useRouter } from "next/router";

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

  return (
    <header className="flex flex-col gap-2 lg:gap-4">
      <h1 className="text-5xl lg:text-7xl font-bold">Adam Drago</h1>
      <nav>
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
      </nav>
    </header>
  );
};
