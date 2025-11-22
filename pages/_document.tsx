import { Html, Head, Main, NextScript } from "next/document";
import Footer from "@/components/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Apex風のフォント "Rajdhani" を導入 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* 背景をダークグレー基調に変更し、ドットパターンなどのテクスチャをイメージさせるクラスを追加 */}
      <body className="antialiased min-h-[100vh] bg-[#1a1a1a] text-white font-rajdhani selection:bg-apex-red selection:text-white">
        <div className="fixed inset-0 z-[-1] opacity-10 pointer-events-none bg-[radial-gradient(#DA292A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
