/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";

import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "../styles/main.css";
import "nprogress/nprogress.css";
import * as gtag from "../lib/gtag";
const isProduction = process.env.NODE_ENV === "production";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageView(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
