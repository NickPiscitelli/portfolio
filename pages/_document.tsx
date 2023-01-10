import { Html, Head, Main, NextScript } from 'next/document'
import { Header } from "../components/head";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
