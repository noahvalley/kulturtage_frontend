import useSwr from "swr"
import { useRouter } from "next/router"
import { CONFIG } from "CONFIG"
import Icon from "components/Icon"
import Link from "components/Link"
import Tags from "components/Tags"
import Dropdown from "components/Dropdown"
import gsap from "gsap"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { fn } from "functions/fn"
import { observer } from "mobx-react-lite"
import { Favorites } from "services/Favorites"
import Slider from "components/Slider"
import Head from "next/head"
import { Gui } from "services/Gui"

const dates = ["Donnerstag", "Freitag", "Samstag", "Sonntag", "Rund um die Uhr"]

const abbreviations = {
  Donnerstag: "DO 15.6",
  Freitag: "FR 16.6",
  Samstag: "SA 17.6",
  Sonntag: "SO 18.6",
  "Rund um die Uhr": "RudU",
}

const ruduVorstellungen: Partial<IVorstellung>[] = [
  {
    _id: "1",
    datum: "Donnerstag",
    uhrzeitStart: "ganztägig",
  },
  {
    _id: "2",
    datum: "Freitag",
    uhrzeitStart: "ganztägig",
  },
  {
    _id: "3",
    datum: "Samstag",
    uhrzeitStart: "ganztägig",
  },
  {
    _id: "4",
    datum: "Sonntag",
    uhrzeitStart: "ganztägig",
  },
]

export default observer(() => {
  const router = useRouter()
  const id = router.query.id

  const [isMounted, setIsMounted] = useState(false)
  const elmage = useRef<HTMLDivElement>(null)
  const elmageMiddle = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isMounted) return
    if (elmage.current && elmageMiddle.current) {
      const el = fn.isMobile() ? elmage.current : elmageMiddle.current
      el.scrollIntoView({ behavior: "smooth", block: "end" })
      setIsMounted(true)
    }
  })

  const event: IEvent = useSwr(
    "/api/collections/get/Events?populate=5&filter[_id]=" + id
  ).data?.entries?.[0]
  const allVorstellungen: IVorstellung[] = useSwr(
    "/api/collections/get/Vorstellungen?populate=5"
  ).data?.entries
  if (!(event && allVorstellungen)) return null

  const vorstellungen = allVorstellungen
    .filter((x) => x.event._id === event._id)
    .sort((a, b) => {
      const toValue = (v: IVorstellung) => {
        const valueDate = dates.indexOf(v.datum) * 10000
        const valueTime = +v.uhrzeitStart.replace(":", "") || 0
        return valueDate + valueTime
      }
      return toValue(a) - toValue(b)
    })

  const isRudu = !!vorstellungen.find((x) => x.datum === "Rund um die Uhr")

  const isFavorite = vorstellungen.some((x) => Favorites.has(x._id))

  function onToggleFavorite() {
    if (isFavorite) vorstellungen.forEach((x) => Favorites.remove(x._id))
    else Favorites.add(vorstellungen[0]._id)
  }

  async function onShare() {
    await navigator.share({
      text: `${event.titel}`,
      url: `${window.location.href}`,
    })
  }

  async function onClose() {
    const page = document.getElementById("page")!
    await gsap.to(page, { opacity: 0, duration: 0.2, ease: "none" })
    if (Gui.goBack) await router.back()
    else await router.push("/programm")
    Gui.goBack = false
    await gsap.to(page, { opacity: 1, duration: 0.2, ease: "none" })
    gsap.set(page, { clearProps: "all" })
  }

  return (
    <main className="grid-cols-3 items-start lg:grid">
      <Head>
        <title>Kulturtage SH - {event.titel}</title>
      </Head>

      {/*aside lg*/}
      <aside
        className={"sticky top-4 hidden h-[calc(100vh-32px)] flex-col lg:flex"}
      >
        <header className={"flex items-center gap-4 border-b-2 pb-4"}>
          <button onClick={onClose}>
            <Icon name="close" className="mr-auto" />
          </button>
          {/*<button onClick={onShare}>*/}
          {/*  <Icon name="share" />*/}
          {/*</button>*/}
          <button onClick={onToggleFavorite}>
            <Icon name={isFavorite ? "heartOn" : "heartOff"} />
          </button>
        </header>
        <section className={"grow"}>
          {(isRudu ? ruduVorstellungen : vorstellungen).map((v) => (
            <div key={v._id} className={"border-b-2 py-3 xl:text-lg"}>
              <div className={"flex gap-2"}>
                <div className={"w-[80px] shrink-0 xl:w-[100px]"}>
                  {abbreviations[v.datum!]}
                </div>
                <div>
                  {v.uhrzeitStart}
                  {v.uhrzeitEnde && <span>–{v.uhrzeitEnde}</span>}
                </div>
                {v.dauer && <div>{v.dauer} Minuten</div>}
              </div>
              <div className={"text-gray"}>{event.ort.name}</div>
            </div>
          ))}
        </section>
        <footer className={"xl:text-lg"}>{event.infos}</footer>
      </aside>
      {/**/}
      <div className={"col-span-2 border-white lg:border-l-[16px]"}>
        <div className="h-[33vh] lg:hidden"></div>
        <img
          src={CONFIG.assetsUrl + event.svg.path}
          alt={event.titel}
          className={"sticky top-4 aspect-4/3 w-full object-cover"}
        />
        <div className={"relative z-10 space-y-8 bg-white"}>
          <div className={"relative"} ref={elmage}>
            <Slider
              paths={[event.bild, ...(event.mehrBilder ?? [])].map(
                (x) => CONFIG.assetsUrl + x.path
              )}
            />
            <div
              ref={elmageMiddle}
              className="pointer-events-none absolute top-0 h-1/2 w-full"
            ></div>
          </div>
          <Tags tags={event.tags} />
          {/*aside sm/md*/}
          <aside className={"lg:hidden"}>
            <header
              className={
                "fixed top-0 left-1/4 right-0 flex h-12 items-center gap-4 px-4 sm:left-0 sm:px-3 lg:hidden"
              }
            >
              <button onClick={onToggleFavorite}>
                <Icon name={isFavorite ? "heartOn" : "heartOff"} />
              </button>
              <button onClick={onShare} className="hidden sm:block">
                <Icon name="share" />
              </button>
              <button onClick={onClose} className={"ml-auto"}>
                <Icon name="close" />
              </button>
            </header>
            <section className={"mb-4 divide-y-2 border-y-2"}>
              {(isRudu ? ruduVorstellungen : vorstellungen).map((v) => (
                <div key={v._id} className={"py-2"}>
                  <div className={"grid grid-cols-[100px_140px_110px]"}>
                    <div>{abbreviations[v.datum!]}</div>
                    <div>
                      {v.uhrzeitStart}
                      {v.uhrzeitEnde && <span>-{v.uhrzeitEnde}</span>}
                    </div>
                    {v.dauer && <div>{v.dauer} min</div>}
                  </div>
                  <div className={"text-gray"}>{event.ort.name}</div>
                </div>
              ))}
            </section>
          </aside>
          {/**/}
          <h1>
            <span className={"text-lg xl:text-xl"}>{event.titel}</span>
            <br />
            <span className={"xl:text-lg"}>{event.untertitel}</span>
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: event.text }}
            className={"prose"}
          ></div>
          <div
            dangerouslySetInnerHTML={{ __html: event.iframe }}
            className={
              "space-y-8 empty:hidden children:aspect-16/9 children:h-full children:w-full"
            }
          ></div>
          <section className={"pt-[2px] children:-mt-[2px]"}>
            {event.bio && (
              <Dropdown heading="Über">
                <div
                  dangerouslySetInnerHTML={{ __html: event.bio }}
                  className={"text-gray"}
                ></div>
              </Dropdown>
            )}
            {event.credits && (
              <Dropdown heading="Credits">
                <div
                  dangerouslySetInnerHTML={{ __html: event.credits }}
                  className={"text-gray"}
                ></div>
              </Dropdown>
            )}
            <div className="lg:hidden">
              {event.infos && (
                <Dropdown heading="Infos">
                  <div
                    dangerouslySetInnerHTML={{ __html: event.infos }}
                    className={"text-gray"}
                  ></div>
                </Dropdown>
              )}
            </div>
          </section>
          <section className={"flex flex-wrap gap-x-5 gap-y-1 xl:text-lg"}>
            {(event.links ?? []).map((x) => (
              <Link
                className={"block text-blue"}
                key={x.value.link}
                href={x.value.link}
                blank
              >
                {x.value.text}
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  )
})
