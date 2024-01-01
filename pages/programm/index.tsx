import useSwr from "swr"
import { CONFIG } from "CONFIG"
import Link from "components/Link"
import Icon from "components/Icon"
import Tags from "components/Tags"
import { observer } from "mobx-react-lite"
import { autorun, makeAutoObservable, reaction } from "mobx"
import React, { useEffect, useRef, useState } from "react"
import { Favorites } from "services/Favorites"
import { Filter } from "services/Filter"
import { fn } from "functions/fn"
import SearchField from "components/SearchField"
import { useClickOutside } from "hooks/useClickOutside"
import FilterOptions from "components/FilterOptions"
import { Overlay } from "services/Overlay"
import gsap from "gsap"
import { Gui } from "services/Gui"

// constants
////////////////////////////////////////////////////////////////////////////////
const dates = ["Donnerstag", "Freitag", "Samstag", "Sonntag", "Rund um die Uhr"]

const suffixes = {
  Donnerstag: "15. Juni",
  Freitag: "16. Juni",
  Samstag: "17. Juni",
  Sonntag: "18. Juni",
  "Rund um die Uhr": "",
}

const abbreviations = {
  Donnerstag: "DO",
  Freitag: "FR",
  Samstag: "SA",
  Sonntag: "SO",
  "Rund um die Uhr": "",
}

// scrolling service
////////////////////////////////////////////////////////////////////////////////
export const Scroller = new (class {
  anchor = "Donnerstag"

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  scrollTo(date: string) {
    document.getElementById(date)?.scrollIntoView({ behavior: "smooth" })
  }

  onScroll = fn.throttle(() => {
    console.log("scroll")
    const anchorElems = [
      ...document.querySelectorAll<HTMLElement>("a[data-scroll-spy]"),
    ]
    const anchors = anchorElems.map((x) => ({
      id: x.dataset.scrollSpy!,
      isVisible: x.offsetTop - 1 <= window.scrollY,
    }))
    Scroller.anchor = anchors.filter((x) => x.isVisible).at(-1)?.id ?? ""
  }, 200)
})()

// parent component
////////////////////////////////////////////////////////////////////////////////
export default observer(() => {
  const data: IVorstellung[] = useSwr(
    "/api/collections/get/Vorstellungen?populate=5"
  ).data?.entries

  const orte: IOrt[] = useSwr("/api/collections/get/Orte").data?.entries.sort(
    (a, b) => a.name.localeCompare(b.name)
  )

  const tags: ITag[] = useSwr("/api/collections/get/Tags").data?.entries.sort(
    (a, b) => a.name.localeCompare(b.name)
  )

  useEffect(() => {
    Gui.goBack = true
    Filter.set(data)
  }, [data])

  useEffect(() => {
    window.addEventListener("scroll", Scroller.onScroll)
    return () => window.removeEventListener("scroll", Scroller.onScroll)
  })

  if (!(data && orte)) return null
  return (
    <main className="">
      <Header tags={tags ?? []} orte={orte ?? []} />
      {Filter.filtered.length ? (
        <List />
      ) : (
        <img src={"/illustrations/no-hits.svg"} alt={"Keis Ergebnis"} />
      )}
      <section className={"h-96 print:h-0"}>
        {/*bottom spacer to make sure scroll spy for last can be triggered*/}
      </section>
      <div></div>
    </main>
  )
})

// header component
////////////////////////////////////////////////////////////////////////////////
const Header = observer((p: { orte: IOrt[]; tags: ITag[] }) => {
  const elHeader = useRef<HTMLElement>()
  useClickOutside(elHeader, () => {
    setTimeout(() => (Filter.search = null), 200)
  })

  async function onDownload() {
    const viewBefore = Filter.isListView
    Filter.isListView = true
    setTimeout(() => {
      window.print()
      Filter.isListView = viewBefore
    })
  }

  return (
    <header
      className={
        "sticky top-4 z-10 -mb-4 -translate-y-4 bg-white  print:hidden sm:-mx-3"
      }
      // @ts-ignore
      ref={elHeader}
    >
      <div className="flex h-20 items-center gap-4 border-b-2 bg-white  sm:h-12 sm:px-3 xl:gap-8">
        {dates.map((d) => (
          <button
            key={d}
            className={`text-lg xl:text-xl ${
              d === Scroller.anchor ? "text-blue" : "text-gray"
            }`}
            onClick={() => Scroller.scrollTo(d)}
            onMouseEnter={() => (Overlay.name = d)}
            onMouseLeave={() => (Overlay.name = "")}
          >
            <span className={"sm:hidden"}>{d}</span>
            <span className={"hidden sm:block"}>{abbreviations[d]}</span>
          </button>
        ))}
        <div className="ml-auto flex gap-4">
          <button onClick={Filter.toggleListView} className={"hidden sm:block"}>
            <Icon name={Filter.isListView ? "viewImage" : "viewList"} />
          </button>
          <button onClick={Filter.toggleOptions} className={"hidden sm:block"}>
            <Icon name={Filter.hasFilter() ? "filterOn" : "filterOff"} />
          </button>
          {Filter.onlyFavorites && (
            <button onClick={onDownload} className={"sm:hidden"}>
              <Icon name={"download"} />
            </button>
          )}
          <button
            onClick={Filter.toggleFavorites}
            onMouseEnter={() =>
              (Overlay.name = Filter.onlyFavorites ? "" : "favorites")
            }
            onMouseLeave={() => (Overlay.name = "")}
          >
            <Icon name={Filter.onlyFavorites ? "heartOn" : "heartOff"} />
          </button>
          <button
            onClick={Filter.toggleSearch}
            onMouseEnter={() =>
              (Overlay.name = Filter.hasSearch ? "" : "search")
            }
            onMouseLeave={() => (Overlay.name = "")}
          >
            <Icon name={Filter.hasSearch ? "closeRed" : "search"} />
          </button>
        </div>
        {Filter.hasSearch && (
          <div className="absolute left-0 right-10 h-[82px] border-b-2 bg-white sm:h-[50px] sm:pl-3">
            <SearchField
              value={Filter.search}
              onChange={(x) => (Filter.search = x)}
            />
          </div>
        )}
      </div>
      <FilterMobile tags={p.tags} orte={p.orte} />
      <FilterDesktop orte={p.orte} tags={p.tags} />
    </header>
  )
})

// filter component (desktop)
////////////////////////////////////////////////////////////////////////////////
const FilterDesktop = observer((p: { orte: IOrt[]; tags: ITag[] }) => {
  const elTags = useRef<HTMLElement>(null)
  const elOptions = useRef<HTMLElement>(null)
  const duration = 0.4

  async function expand(el: HTMLElement) {
    await gsap.to(el, { height: "auto", duration })
  }

  async function collapse(el: HTMLElement) {
    await gsap.to(el, { height: 32, duration })
  }

  return (
    <div className={`bg-white sm:hidden`}>
      <section
        ref={elTags}
        className={"h-[32px] overflow-y-hidden border-b-2 py-2"}
        onMouseEnter={() => expand(elTags.current!)}
        onMouseLeave={() => collapse(elTags.current!)}
      >
        <FilterOptions
          options={p.tags.map((x) => x.name)}
          selected={Filter.tags}
          onChange={(x) => (Filter.tags = x)}
        />
      </section>
      <section
        ref={elOptions}
        className={"h-[32px] overflow-y-hidden  border-b-2 py-2"}
        onMouseEnter={() => expand(elOptions.current!)}
        onMouseLeave={() => collapse(elOptions.current!)}
      >
        <FilterOptions
          options={p.orte.map((x) => x.name)}
          selected={Filter.orte}
          onChange={(x) => (Filter.orte = x)}
        />
      </section>
    </div>
  )
})

// filter component (mobile)
////////////////////////////////////////////////////////////////////////////////
const FilterMobile = observer((p: { orte: IOrt[]; tags: ITag[] }) => {
  return (
    <div
      className={`absolute -z-10 hidden max-h-[calc(100vh-94px)] overflow-y-auto bg-white px-0 transition-transform sm:block ${
        Filter.showOptions ? "-translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      <section className={"border-b-2 py-2 px-3"}>
        <h4 className={"mb-2 uppercase"}>Kategorien</h4>
        <FilterOptions
          options={p.tags.map((x) => x.name)}
          selected={Filter.tags}
          onChange={(x) => (Filter.tags = x)}
        />
      </section>
      <section className={"border-b-2 py-2  px-3"}>
        <h4 className={"mb-2 uppercase"}>Spielorte</h4>
        <FilterOptions
          options={p.orte.map((x) => x.name)}
          selected={Filter.orte}
          onChange={(x) => (Filter.orte = x)}
        />
      </section>
    </div>
  )
})

// list component
////////////////////////////////////////////////////////////////////////////////
const List = observer(() => {
  return (
    <div>
      {dates
        .filter((x) => Filter.hasForDate(x))
        .map((d) => (
          <section key={d}>
            <a
              id={d}
              data-scroll-spy={d}
              className={
                "absolute z-10 -mt-[144px] block h-2 w-0 bg-red sm:-mt-[48px]"
              }
            ></a>
            <h2 className={"py-12 text-xl text-blue sm:py-6 sm:text-lg"}>
              <span>{d}</span>
              <span> {suffixes[d]}</span>
            </h2>
            <div
              className={`grid ${
                Filter.isListView
                  ? ""
                  : "grid-cols-2 gap-x-4 gap-y-8  sm:grid-cols-1 xl:grid-cols-3"
              }`}
            >
              {Filter.getForDate(d).map((v) => (
                <React.Fragment key={v._id}>
                  {Filter.isListView ? (
                    <ItemMini vorstellung={v} />
                  ) : (
                    <Item vorstellung={v} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        ))}
    </div>
  )
})

// item component (image view)
////////////////////////////////////////////////////////////////////////////////
const Item = observer((p: { vorstellung: IVorstellung }) => {
  const v = p.vorstellung
  return (
    <article className={"group"}>
      <Link
        href={"/programm/show?id=" + v.event._id}
        className="flex h-full flex-col"
      >
        <img
          src={CONFIG.assetsUrl + v.event.bild.path}
          alt={v.event.titel}
          className={
            "mb-2 aspect-4/3 w-full object-cover grayscale hover:grayscale-0 sm:-mx-3 sm:w-screen sm:grayscale-0"
          }
        />
        <div className="flex items-center text-sm">
          <span className="w-20">{v.uhrzeitStart}</span>
          <span>{v.event.ort.name}</span>
          <button
            className="ml-auto"
            onClick={(e) => {
              e.stopPropagation()
              Favorites.toggle(v._id)
              setTimeout(() => Scroller.onScroll())
            }}
          >
            <Icon name={Favorites.has(v._id) ? "heartOn" : "heartOff"} />
          </button>
        </div>
        <h3 className={"mb-2 grow text-lg"}>
          {v.event.titel}
          <br />
          {v.event.untertitel}
        </h3>
        <Tags
          tags={v.event.tags}
          className="bg-gray-light group-hover:bg-yellow sm:bg-yellow"
        />
      </Link>
    </article>
  )
})

// item component (list view)
////////////////////////////////////////////////////////////////////////////////
const ItemMini = observer((p: { vorstellung: IVorstellung }) => {
  const v = p.vorstellung
  return (
    <Link
      href={"/programm/show?id=" + v.event._id}
      className="flex border-b-2 py-3 text-sm first:border-t-2"
    >
      <div className="w-20 shrink-0">{v.uhrzeitStart}</div>
      <h3 className={""}>{v.event.titel}</h3>
    </Link>
  )
})
