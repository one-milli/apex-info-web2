import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased min-h-[100vh] bg-gradient-to-br from-indigo-950 via-indigo-700 to-rose-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
