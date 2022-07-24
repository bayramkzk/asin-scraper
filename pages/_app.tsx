import fetcher from "@/utils/fetcher";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const darkTheme = createTheme({
    palette: {
      mode: prefersLightMode ? "light" : "dark",
    },
  });

  return (
    <SWRConfig value={{ fetcher }}>
      <SessionProvider session={session}>
        <ThemeProvider theme={darkTheme}>
          <Head>
            <title>ASIN Scraper</title>
          </Head>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
