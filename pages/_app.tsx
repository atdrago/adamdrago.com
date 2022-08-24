import "styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Layout } from "components/Layout";
import { ColorSchemeProvider } from "contexts/ColorSchemeContext";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  let page: "home" | "work" | "contact" = "home";

  switch (router?.pathname) {
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
    <ColorSchemeProvider>
      <Layout page={page}>
        <Component {...pageProps} />
      </Layout>
    </ColorSchemeProvider>
  );
}

export default App;
