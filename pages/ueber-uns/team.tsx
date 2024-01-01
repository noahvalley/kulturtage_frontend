import useSwr from "swr"
import { CONFIG } from "CONFIG"

export default function Page() {
  const { data } = useSwr("/api/singletons/get/Team")
  if (!data) return null
  const personen = data.personen?.map((x) => x.value) ?? []

  return (
    <main className="prose">
      <h1 className="hidden sm:block">{data.titel}</h1>

      {data.gruppenbildAnzeigen && (
        <figure className="mb-4">
          <img
            src={CONFIG.assetsUrl + data.gruppenbild.path}
            alt={"Gruppenbild"}
            className="object-cover mb-2 w-full aspect-16/9 sm:-mx-4 sm:-mt-4 sm:w-screen sm:max-w-none"
          />
          <figcaption className="text-sm">{data.bildunterschrift}</figcaption>
        </figure>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
        {personen.map((p) => (
          <article key={p.name} className="relative">
            <img
              src={CONFIG.assetsUrl + p.foto.path}
              alt={p.name}
              className="object-cover mb-3 w-full aspect-[3/2] sm:-mx-4 sm:w-screen sm:max-w-none"
            />
            <img
              src={CONFIG.assetsUrl + p.schriftzug.path}
              alt={""}
              className="object-cover absolute top-0 w-full transition-opacity duration-200 hover:opacity-0 aspect-[3/2] sm:-mx-4 sm:w-screen sm:max-w-none"
            />
            <h3>
              <a href={"mailto:" + p.mail}>{p.name}</a>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: p.text }}></div>
          </article>
        ))}
      </div>
    </main>
  )
}
