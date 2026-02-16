import { Html, Head, Main, NextScript } from "next/document";
import { Header } from "../components/head";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
