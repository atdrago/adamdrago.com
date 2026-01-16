"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export const HeaderLink = ({
  children,
  href,
  ...props
}: React.PropsWithChildren<LinkProps>) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href={href}
      className={
        pathname === href
          ? "text-3xl lg:text-4xl font-bold"
          : "text-3xl lg:text-4xl"
      }
    >
      {children}
    </Link>
  );
};
