import useSwr from "swr"
import LogoMobile from "components/LogoMobile"

export default function Page() {
  const {data} = useSwr("/api/singletons/get/Kontakt")
  if (!data) return null

  return (
    <main className="prose">
      <h1>{data.titel}</h1>
      <LogoMobile/>
      <div dangerouslySetInnerHTML={{__html: data.text}}></div>
    </main>
  )
}

