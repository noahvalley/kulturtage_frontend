import useSwr from "swr"
import LogoMobile from "components/LogoMobile"

export default function Page() {
  const { data } = useSwr("/api/singletons/get/Bewerben")
  if (!data) return null

  return (
    <main className="prose flex flex-col">
      <h1 className="hidden">{data.titel}</h1>
      <LogoMobile />
      <div
        className="flex grow flex-col"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></div>
    </main>
  )
}
