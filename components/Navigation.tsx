import ReactDOM from "react-dom"
import { useRouter } from "next/router"
import Link from "components/Link"
import Logo from "components/Logo"
import { observable } from "mobx"
import { observer } from "mobx-react-lite"
import useSwr from "swr"
import { useSettings } from "hooks/useSettings"
import { router } from "next/client"
import { fn } from "functions/fn"
import { Overlay } from "services/Overlay"
import LogoNeo from "components/LogoNeo"

export default observer(function Navigation() {
  const router = useRouter()
  const settings = useSettings()

  return (
    <nav
      className={`sticky top-4 col-span-2 col-start-1 row-start-1 grid grid-cols-2 gap-4 pl-4 print:hidden sm:hidden`}
    >
      <section className="flex flex-col items-start text-lg text-gray xl:text-xl">
        <div
          className="contents"
          onMouseEnter={() => (Overlay.name = "home")}
          onMouseLeave={() => (Overlay.name = "")}
        >
          <LogoNeo />
        </div>
        <NavLink href="/news" text="News" />
        {/* <NavLink href="/programm" text="Programm" /> */}
        {/* <NavLink href="/tipps" text="Tipps" /> */}
        {/* <NavLink href="/standorte" text="Standorte" /> */}
        {/* <NavLink href="/service" text="Service" /> */}
        <NavLink href="/das-festival/konzept" text="Das Festival" />
        {/*<NavLink href="/mitmachen" text="Mitmachen" />*/}
        <NavLink href="/ueber-uns/der-verein" text="Über uns" />
      </section>
      <section className="text-lg text-gray xl:text-xl">
        <div
          className={`duration-300 absolute transition-all ${
            router.asPath.startsWith("/das-festival")
              ? ""
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <NavLink href="/das-festival/konzept" text="Konzept" />
          <NavLink href="/das-festival/ursprung" text="Ursprung" />
        </div>
        <div
          className={`duration-300 absolute transition-all ${
            router.asPath.startsWith("/mitmachen")
              ? ""
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <NavLink href="/mitmachen/wie-und-was" text="Wie und was" />
          <NavLink href="/mitmachen/bewerben" text="Bewerben" />
        </div>
        <div
          className={`duration-300 absolute transition-all ${
            router.asPath.startsWith("/ueber-uns")
              ? ""
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <NavLink href="/ueber-uns/der-verein" text="Der Verein" />
          <NavLink href="/ueber-uns/mitglied-werden" text="Mitglied werden" />
          <NavLink href="/ueber-uns/team" text="Team" />
          <NavLink href="/ueber-uns/kontakt" text="Kontakt" />
          <NavLink href="/ueber-uns/unterstutzung" text="Unterstützung" />
        </div>
      </section>
      <section className="fixed bottom-4 text-gray xl:text-lg">
        <NavLink href="/newsletter" text="Newsletter" />
        <NavLink href={settings.instagram ?? ""} text="Instagram" />
        <NavLink href={settings.facebook ?? ""} text="Facebook" />
        <NavLink href="/impressum" text="Impressum" />
      </section>
    </nav>
  )
})

function NavLink({ href, text }: { href: string; text: string }) {
  const router = useRouter()
  const svg = text.toLowerCase().replaceAll(" ", "-").replaceAll("ü", "u")
  return (
    <Link href={href} blank={href.startsWith("https://")}>
      <a
        onMouseEnter={() => (Overlay.name = svg)}
        onMouseLeave={() => (Overlay.name = "")}
        className={`block w-max enter:text-black ${
          router.asPath.startsWith(href) && "text-black"
        }`}
      >
        {text}
      </a>
    </Link>
  )
}
