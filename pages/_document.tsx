import { Head, Html, Main, NextScript } from "next/document"
import { CONFIG } from "CONFIG.dev"

export default function Document() {
  return (
    <Html lang="de-ch">
      <Head>
        <title>Kulturtage SH</title>
        <meta
          name="description"
          content="Von Schaffhausen - für Schaffhausen: Ein lokales Kulturfestival in der Altstadt Schaffhausen wird ins Leben gerufen."
        />
        <meta property="og:title" content="Kulturtage SH" />
        <meta
          property="og:description"
          content="Von Schaffhausen - für Schaffhausen: Ein lokales Kulturfestival in der Altstadt Schaffhausen wird ins Leben gerufen."
        />
        <meta property="og:url" content="https://www.kulturtage.sh/" />
        <meta
          property="og:image"
          content="https://www.kulturtage.sh/open-graph.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
