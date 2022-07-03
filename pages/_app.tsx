import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SWRConfig } from "swr";
import "../styles/globals.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider session={session}>
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
