import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Head>
        <title>Apex Legends Map Rotation</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
