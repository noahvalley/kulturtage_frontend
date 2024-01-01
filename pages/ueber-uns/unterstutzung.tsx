import useSwr from "swr"
import { CONFIG } from "CONFIG"

export default function Page() {
  const { data } = useSwr("/api/singletons/get/Sponsoren")
  if (!data) return null
  const logos = data.logos?.map((x) => x.value) ?? []

  return (
    <main className="prose">
      <h1>{data.titel}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
      <a
        href={logos[0].link}
        target="_blank"
        rel="noreferrer"
        className={"contents"}
      >
        <img
          src={CONFIG.assetsUrl + logos[0].bild.path}
          alt=""
          className={"w-full max-w-[600px] mb-6"}
        />
      </a>
      <div className="flex flex-wrap items-center gap-6">
        {logos.slice(1).map((l) => (
          <a
            key={l.link}
            href={l.link}
            target="_blank"
            rel="noreferrer"
            className={"contents"}
          >
            <img
              src={CONFIG.assetsUrl + l.bild.path}
              alt=""
              className={"h-12"}
            />
          </a>
        ))}
      </div>
    </main>
  )
}
