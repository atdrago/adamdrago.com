import type { PropsWithChildren } from "react";
import Head from "next/head";
import Image from "next/image";
import cherryTreeImage from "public/static/cherry-tree.jpg";
import cherryTreeDarkImage from "public/static/cherry-tree-dark.jpg";
import coffeeMugImage from "public/static/coffee-mug.png";
import { SelectField } from "components/SelectField";
import { useColorSchemeContext } from "contexts/ColorSchemeContext";
import { BackgroundImage } from "components/BackgroundImage";

interface LayoutProps {
  page: "home" | "work" | "contact";
}

export const Layout = ({ children, page }: PropsWithChildren<LayoutProps>) => {
  const {
    colorScheme,
    computedColorScheme,
    computedColorSchemeIcon,
    setColorScheme,
  } = useColorSchemeContext();

  return (
    <>
      <Head>
        <title>Adam Drago</title>
        <meta name="description" content="A site about Adam Drago" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={
            computedColorScheme === "dark" ? "black-translucent" : "default"
          }
        ></meta>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (
              localStorage.theme === "dark" ||
              (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          `,
          }}
        ></script>
      </Head>
      <BackgroundImage
        alt=""
        layout="fixed"
        aria-hidden={true}
        width={714}
        height={760}
        src={cherryTreeImage}
        isVisible={page === "home" && computedColorScheme === "light"}
        outerClassName={"-top-[50px] sm:-top-[100px] lg:top-[5%]"}
        innerClassName={`-right-[400px] sm:-right-[200px] lg:-right-[250px] xl:-right-[150px] 2xl:right-0`}
      />
      <BackgroundImage
        alt=""
        layout="fixed"
        aria-hidden={true}
        width={714}
        height={760}
        src={cherryTreeDarkImage}
        isVisible={page === "home" && computedColorScheme === "dark"}
        outerClassName={"-top-[50px] sm:-top-[100px] lg:top-[5%]"}
        innerClassName={`-right-[400px] sm:-right-[200px] lg:-right-[250px] xl:-right-[150px] 2xl:right-0`}
      />
      <BackgroundImage
        alt=""
        layout="fixed"
        aria-hidden={true}
        width={1698}
        height={1084}
        src={coffeeMugImage}
        isVisible={page === "work" && computedColorScheme === "light"}
        outerClassName={"-top-[200px] md:top-[100px]"}
        innerClassName={`-right-[1200px] sm:-right-[1100px] xl:-right-[700px]`}
      />
      <div
        className={
          "mx-auto absolute left-0 right-0 top-2/3 px-8 font-serif max-w-prose"
        }
      >
        {children}
      </div>
    </>
  );
};
