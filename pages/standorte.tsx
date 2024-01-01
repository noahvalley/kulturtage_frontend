import useSwr from "swr"
import LogoMobile from "components/LogoMobile"
import Map from "components/Map"
import Dropdown from "components/Dropdown"
import { ReactNode, useState } from "react"
import DropdownNeo from "components/DropdownNeo"
import dynamic from "next/dynamic"
import Icon from "components/Icon"

const MapNeo = dynamic(() => import("components/MapNeo"), { ssr: false })

export default function Page() {
  const { data } = useSwr("/api/singletons/get/Standorte")
  const [active, setActive] = useState("")
  if (!data) return null
  const standorte: IStandort[] = data.standorte.map((x) => x.value)

  return (
    <main className="">
      <h1 className={"sr-only"}>{data.titel}</h1>
      <LogoMobile />
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
        <aside className={"children:-mt-[2px]"}>
          {standorte.map((x, i) => (
            <DropdownNeo
              key={i}
              prefix={i + 1}
              heading={x.name}
              onToggle={() => setActive(x.name !== active ? x.name : "")}
              open={x.name === active}
            >
              <div>
                <div
                  className={"prose text-sm children:last:mb-0"}
                  dangerouslySetInnerHTML={{ __html: x.text }}
                ></div>
              </div>
              <div className="flex gap-2 py-4 children:w-4 empty:hidden">
                {x.wc && <Icon name="toilet" />}
                {x.rollstuhl && <Icon name="wheelchair" />}
                {x.essen && <Icon name="food" />}
              </div>
            </DropdownNeo>
          ))}
        </aside>
        <article className={"col-span-2 sm:hidden"}>
          {/*@ts-ignore*/}
          <MapNeo
            standorte={standorte}
            active={active}
            onSelect={(x) => setActive(x !== active ? x : "")}
          />
        </article>
      </div>
    </main>
  )
}
