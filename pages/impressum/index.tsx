import useSwr from "swr"

export default function Page() {
  const {data} = useSwr("/api/singletons/get/Impressum")
  if (!data) return null

  return (
    <main className="prose">
      <h1>{data.titel}</h1>
      <div dangerouslySetInnerHTML={{__html: data.text}}></div>
    </main>
  )
}

