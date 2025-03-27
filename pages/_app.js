import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>POPS</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    {/* tiktok verification */}
    <meta name="tiktok-verification" content="9vy1HlLfCgn4tmBu7nZqB58YXqlNC03n" />

    {/* Icon */}
    <link rel="icon" href="/favicon.ico" />

  {/* Google bot */}
  <meta name="googlebot" content="index, follow" />
  <meta name="robots" content="index, follow" />
  </Head>
  
  <Component {...pageProps} /></>;
}
