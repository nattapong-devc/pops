import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>POPS</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    {/* tiktok verification */}
    <meta name="tiktok-verification" content="2hpLNIo6gUwD61ECqfHNJrRLOvHUyl9M" />
  </Head>
  
  <Component {...pageProps} /></>;
}
