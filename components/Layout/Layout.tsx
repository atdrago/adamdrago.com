import type { PropsWithChildren } from "react";
import Head from "next/head";
import Image from "next/image";
import cherryTreeImage from "public/static/cherry-tree.png";
import coffeeMugImage from "public/static/coffee-mug.png";

interface LayoutProps {
  page: "home" | "work" | "contact";
}

export const Layout = ({ children, page }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>Adam Drago</title>
        <meta name="description" content="A site about Adam Drago" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>
      </Head>
      <div
        className={`absolute w-full h-[760px] -top-[50px] sm:-top-[100px] lg:top-[5%] overflow-hidden pointer-events-none transition-${
          page === "home" ? "in" : "out"
        }`}
      >
        <div
          className={
            "absolute -z-10 w-[714px] h-[760px] -right-[400px] sm:-right-[200px] lg:-right-[250px] xl:-right-[150px] 2xl:-right-0"
          }
        >
          <Image
            alt=""
            layout="fixed"
            aria-hidden={true}
            width={714}
            height={760}
            src={cherryTreeImage}
            placeholder="blur"
          />
        </div>
      </div>
      <div
        className={`absolute w-full h-[1084px] -top-[200px] md:top-[100px] overflow-hidden pointer-events-none transition-${
          page === "work" ? "in" : "out"
        }`}
      >
        <div
          className={
            "absolute -z-10 w-[1698px] h-[1084px] -right-[1200px] sm:-right-[1100px] xl:-right-[700px]"
          }
        >
          <Image
            alt=""
            layout="fixed"
            aria-hidden={true}
            width={1698}
            height={1084}
            src={coffeeMugImage}
            placeholder="blur"
          />
        </div>
      </div>
      <div
        className={
          "container mx-auto absolute left-0 right-0 top-2/3 px-8 font-serif max-w-prose"
        }
      >
        {children}
      </div>
    </>
  );
};
