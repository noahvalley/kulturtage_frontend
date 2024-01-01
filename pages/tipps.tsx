import useSwr from "swr"
import { CONFIG } from "CONFIG"
import Dropdown from "components/Dropdown"
import { useState } from "react"
import DropdownNeo from "components/DropdownNeo"

export default function Page() {
  const { data } = useSwr("/api/singletons/get/Tipps")
  const [active, setActive] = useState("")
  if (!data) return null
  const tipps = data.tipps?.map((x) => x.value) ?? []

  return (
    <main className="">
      <div className="prose">
        <h1 className="">{data.titel}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-3">
        {tipps.map((t) => (
          <article key={t.titel} className="relative space-y-4">
            <img
              src={CONFIG.assetsUrl + t.foto.path}
              alt={t.titel}
              className="mb-3 aspect-[3/2] w-full object-cover sm:-mx-4 sm:w-screen sm:max-w-none"
            />
            <div dangerouslySetInnerHTML={{ __html: t.info }}></div>

            <div className={''}>
              <Dropdown heading={t.titel}>
                <div
                  dangerouslySetInnerHTML={{ __html: t.text }}
                  className="prose"
                ></div>
              </Dropdown>
            </div>

            {/*<div className={'hidden sm:block'}>*/}
            {/*  <DropdownNeo*/}
            {/*    heading={t.titel}*/}
            {/*    onToggle={() => setActive(t.titel !== active ? t.titel : "")}*/}
            {/*    open={t.titel === active}*/}
            {/*  >*/}
            {/*    <div*/}
            {/*      dangerouslySetInnerHTML={{ __html: t.text }}*/}
            {/*      className="prose"*/}
            {/*    ></div>*/}
            {/*  </DropdownNeo>*/}
            {/*</div>*/}
          </article>
        ))}
      </div>
    </main>
  )
}
