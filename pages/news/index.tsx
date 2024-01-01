import useSwr from "swr"
import { CONFIG } from "CONFIG"
import Masonry from "components/Masonry"
import { useRouter } from "next/router"
import Link from "components/Link"
import { useEffect, useRef, useState } from "react"
import { Scroller } from "pages/programm"
import { fn } from "functions/fn"

export default function Page() {
  const router = useRouter()

  const news: INews[] = useSwr(
    "/api/collections/get/News?populate=5"
  ).data?.entries.sort(
    (a: INews, b: INews) => +new Date(b.datum) - +new Date(a.datum)
  )

  const elSvg = useRef<HTMLDivElement>(null)

  function onScroll() {
    const doHide = window.scrollY > window.innerHeight
    console.log(doHide,window.scrollY, window.innerHeight)
    elSvg.current!.style.visibility = doHide ? "hidden" : "visible"
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  })

  function formatIsoDate(isoDate: string) {
    const date = new Date(isoDate)
    const day = date.toLocaleString("de-ch", { day: "2-digit" })
    const month = date.toLocaleString("de-ch", { month: "long" })
    const year = date.toLocaleString("de-ch", { year: "numeric" })
    return `${day}. ${month} ${year}`
  }

  if (!news) return null
  return (
    <main className="">
      <div className="prose hidden sm:block">
        <h1>News</h1>
      </div>
      <Masonry>
        <div
          ref={elSvg}
          className={`pb-4 sm:fixed sm:top-0 sm:left-0 sm:right-0`}
          style={{ aspectRatio: "18/15" }}
        >
          <img
            src="/illustrations/kulturtage-news.svg"
            alt="News"
            className={"w-full object-cover px-1"}
          />
        </div>
        <div
          className={`mb-3 hidden sm:block`}
          style={{ aspectRatio: "18/15" }}
        >
          <div>{/*spacer mobile*/}</div>
        </div>
        {news.map((x) => (
          <Link
            className={"group relative z-10 block bg-white"}
            key={x._id}
            href={x.link}
            blank={x.link?.startsWith("http")}
          >
            <div className={"space-y-4 pb-4"}>
              <hr className={"-mb-3 sm:-mx-3"} />
              <time className={"block text-sm text-gray empty:hidden"}>
                {formatIsoDate(x.datum)}
              </time>
              <h2 className={"text-lg empty:hidden"}>{x.titel}</h2>
              {x.bild?.path && (
                <img
                  src={CONFIG.assetsUrl + x.bild.path}
                  alt={x.titel}
                  className={
                    "w-full object-cover  grayscale group-hover:grayscale-0 sm:-mx-3 sm:w-screen sm:grayscale-0"
                  }
                  style={{
                    aspectRatio: x.bildformat?.replace(":", "/") ?? "16/9",
                  }}
                />
              )}
              <p className={"empty:hidden sm:text-sm"}>{x.text}</p>
              {x.linkText && (
                <div
                  className={
                    "flex w-max  items-center group-hover:text-green sm:text-sm sm:text-green"
                  }
                >
                  <span
                    className={
                      "w-0 overflow-hidden transition-all group-hover:w-5 sm:w-5"
                    }
                  >
                    →
                  </span>
                  <span>{x.linkText}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </Masonry>
    </main>
  )
}
