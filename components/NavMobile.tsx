import { observable } from "mobx"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "components/Link"
import useSwr from "swr"
import { useSettings } from "hooks/useSettings"
import { fn } from "functions/fn"

const d = observable({
  open: false,
  category: "" as "" | "das-festival" | "ueber-uns" | "mitmachen",
})

export default observer(function NavMobile() {
  const router = useRouter()
  const settings = useSettings()

  useEffect(() => {
    const closeNav = () => {
      fn.sleep(100).then(() => (d.open = false))
    }
    router.events.on("routeChangeComplete", closeNav)
    return () => router.events.off("routeChangeComplete", closeNav)
  }, [router.events])
  useEffect(() => {
    document.body.style.overflowY = d.open ? "hidden" : "scroll"
  })

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-20 hidden print:hidden sm:block">
      <section className="flex h-[46px] items-center justify-between border-t bg-white px-6 print:border-0">
        <div>{/*spacer*/}</div>
        <Burger
          open={d.open}
          onClick={() => {
            d.open = !d.open
          }}
        />
      </section>
      <section
        className={`duration-700 fixed top-0 bottom-[46px] -z-10 flex w-full flex-col justify-between gap-4 overflow-y-auto border-t-2 bg-white text-gray transition-all  ${
          !d.open && "invisible translate-y-full"
        }`}
      >
        <div className="mt-4">
          {/* <Link href="/programm">
            <a
              onClick={() => (d.category = "")}
              className={"block h-12 w-full text-center text-xl"}
            >
              Programm
            </a>
          </Link> */}
          <Link href="/news">
            <a
              onClick={() => (d.category = "")}
              className={"block h-12 w-full text-center text-xl"}
            >
              News
            </a>
          </Link>
          <Link href="/mitmachen/bewerben">
            <a
              onClick={() => (d.category = "")}
              className={"block h-12 w-full text-center text-xl"}
            >
              Bewerben
            </a>
          </Link>
          {/* <Link href="/tipps">
            <a
              onClick={() => (d.category = "")}
              className={"block h-12 w-full text-center text-xl"}
            >
              Tipps
            </a>
          </Link> */}
          {/* <Link href="/standorte">
            <a
              onClick={() => (d.category = "")}
              className={"block h-12 w-full text-center text-xl"}
            >
              Standorte
            </a>
          </Link> */}
          {/* <Link href="/service">
            <a
              onClick={() => (d.category = "")}
              className={"block h-12 w-full text-center text-xl"}
            >
              Service
            </a>
          </Link> */}
          <button
            onClick={() =>
              (d.category = d.category === "das-festival" ? "" : "das-festival")
            }
            className={`h-12 w-full text-center text-xl ${
              d.category !== "" && "text-black"
            }`}
          >
            Das Festival
          </button>
          <NavLink
            href="/das-festival/konzept"
            text="Konzept"
            show={d.category === "das-festival"}
          />
          <NavLink
            href="/das-festival/ursprung"
            text="Ursprung"
            show={d.category === "das-festival"}
          />
          {/*<button*/}
          {/*  onClick={() =>*/}
          {/*    (d.category = d.category === "mitmachen" ? "" : "mitmachen")*/}
          {/*  }*/}
          {/*  className={`h-12 w-full text-center text-xl ${*/}
          {/*    d.category !== "" && "text-black"*/}
          {/*  }`}*/}
          {/*>*/}
          {/*  Mitmachen*/}
          {/*</button>*/}
          {/*<NavLink*/}
          {/*  href="/mitmachen/wie-und-was"*/}
          {/*  text="Wie und was"*/}
          {/*  show={d.category === "mitmachen"}*/}
          {/*/>*/}
          {/*<NavLink*/}
          {/*  href="/mitmachen/bewerben"*/}
          {/*  text="Bewerben"*/}
          {/*  show={d.category === "mitmachen"}*/}
          {/*/>*/}
          <button
            onClick={() =>
              (d.category = d.category === "ueber-uns" ? "" : "ueber-uns")
            }
            className={`h-12 w-full text-center text-xl ${
              d.category !== "" && "text-black"
            }`}
          >
            Über uns
          </button>
          <NavLink
            href="/ueber-uns/team"
            text="Team"
            show={d.category === "ueber-uns"}
          />
          <NavLink
            href="/ueber-uns/der-verein"
            text="Der Verein"
            show={d.category === "ueber-uns"}
          />{" "}
          <NavLink
            href="/ueber-uns/kontakt"
            text="Kontakt"
            show={d.category === "ueber-uns"}
          />
          <NavLink
            href="/ueber-uns/unterstutzung"
            text="Unterstützung"
            show={d.category === "ueber-uns"}
          />
        </div>

        <div className="mb-4 flex w-full items-center justify-between px-3 text-sm">
          <Link
            className="xsm:hidden"
            href="https://kulturmacherei.ch/mitglied-werden/"
            blank
          >
            <a>Mitglied werden</a>
          </Link>
          <Link href="/newsletter" blank>
            <a>Newsletter</a>
          </Link>
          <Link href="/impressum">
            <a>Impressum</a>
          </Link>
          <Link href={settings.instagram} blank>
            <a>Instagram</a>
          </Link>
          <Link href={settings.facebook} blank>
            <a>Facebook</a>
          </Link>
        </div>
      </section>
    </nav>
  )
})

function NavLink({
  href,
  text,
  show,
}: {
  href: string
  text: string
  show?: boolean
}) {
  return (
    <Link href={href}>
      <a
        className={`block ${
          show ? "h-12" : "h-0"
        } duration-500 overflow-hidden text-center text-xl transition-all`}
      >
        {text}
      </a>
    </Link>
  )
}

function Burger({
  open,
  onClick,
}: {
  open?: boolean | number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`grid h-[16px] w-6 content-between transition-all duration-[600ms] print:hidden  ${
        open && "translate-y-[0px]"
      }`}
    >
      <div
        className={`h-[2px] bg-black transition-all duration-[inherit]  ${
          open && "translate-y-[7px] rotate-[60deg]"
        }`}
      ></div>
      <div
        className={`h-[2px] bg-black transition-all duration-[inherit]  ${
          open && ""
        }`}
      ></div>
      <div
        className={`h-[2px] bg-black transition-all duration-[inherit]  ${
          open && "translate-y-[-7px] rotate-[-60deg]"
        }`}
      ></div>
    </button>
  )
}
