import { Html, Head, Main, NextScript } from "next/document";
import { Inter } from "next/font/google";

export default function Document() {
  const inter = Inter({ subsets: ["latin"] });
  return (
    <Html lang="en">
      <Head />
      <body className={inter.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
