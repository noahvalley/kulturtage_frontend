import "/polyfills/requestIdleCallback"
import "assets/css/tailwind.css"
import type { AppProps } from "next/app"
import { mutate, SWRConfig } from "swr"
import axios from "axios"
import { CONFIG } from "CONFIG"
import Layout from "components/Layout"
import NoSSR from "components/NoSSR"
import { configure } from "mobx"

configure({ enforceActions: "never" })
axios.defaults.baseURL = CONFIG.apiUrl
axios.defaults.headers.common = { Authorization: `Bearer ${CONFIG.apiKey}` }
axios.defaults.headers.common = { "Cockpit-Token": CONFIG.apiKey }
const fetcher = (url) => axios.get(url).then((res) => res.data)

if (typeof window !== "undefined") {
  // @ts-ignore
  window.axios = axios

  // preload
  const images = ["/logo/logo-1.svg", "/logo/logo-2.svg", "/logo/logo-3.svg"]
  const api = [
    "/api/singletons/get/_Einstellungen",
    "/api/singletons/get/Bewerben",
    "/api/singletons/get/Konzept",
    "/api/singletons/get/DerVerein",
    "/api/singletons/get/Ursprung",
    "/api/singletons/get/Kontakt",
    "/api/singletons/get/Team",
    "/api/singletons/get/WieUndWas",
    "/api/singletons/get/Sponsoren",
    "/api/singletons/get/Service",
    "/api/singletons/get/Standorte",
  ]
  window.requestIdleCallback(() => {
    images.forEach((x) => (new Image().src = x))
    api.forEach((x) =>
      mutate(
        x,
        axios.get(x).then((y) => y.data)
      )
    )
  })
}

export default function App({ Component, pageProps }) {
  return (
    <NoSSR>
      <SWRConfig value={{ fetcher, focusThrottleInterval: 1000 }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </NoSSR>
  )
}
