"use client";

import { usePathname } from "next/navigation";

import { BackgroundImage } from "app/components/BackgroundImage";
import cherryTreeDarkImage from "public/static/cherry-tree-dark.jpg";
import cherryTreeImage from "public/static/cherry-tree.jpg";
import coffeeMugImage from "public/static/coffee-mug.png";

export function Backgrounds() {
  const pathname = usePathname();

  let page: "home" | "work" | "contact" = "home";

  switch (pathname) {
    case "/work":
      page = "work";

      break;
    case "/contact":
      page = "contact";

      break;
    default:
      // Do nothing

      break;
  }

  return (
    <>
      <BackgroundImage
        alt=""
        aria-hidden={true}
        height={760}
        innerClassName={`-right-[400px] sm:-right-[200px] lg:-right-[250px] xl:-right-[150px] 2xl:right-0`}
        isVisible={page === "home"}
        outerClassName={"-top-[50px] sm:-top-[100px] lg:top-[5%]"}
        src={cherryTreeImage}
        theme="light"
        width={714}
      />
      <BackgroundImage
        alt=""
        aria-hidden={true}
        height={760}
        innerClassName={`-right-[400px] sm:-right-[200px] lg:-right-[250px] xl:-right-[150px] 2xl:right-0`}
        isVisible={page === "home"}
        outerClassName={"-top-[50px] sm:-top-[100px] lg:top-[5%]"}
        src={cherryTreeDarkImage}
        theme="dark"
        width={714}
      />
      <BackgroundImage
        alt=""
        aria-hidden={true}
        height={1084}
        innerClassName={`-right-[1200px] sm:-right-[1100px] xl:-right-[700px]`}
        isVisible={page === "work"}
        outerClassName={"-top-[200px] md:top-[100px]"}
        src={coffeeMugImage}
        theme="light"
        width={1698}
      />
    </>
  );
}
