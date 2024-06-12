import useSwr from "swr"
import LogoMobile from "components/LogoMobile"

export default function Page() {
  return (
    <main className="prose flex flex-col">
      <LogoMobile />
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/app9X4vpgF5DB0odK/pagk5LMOdWSoJBvP3/form"
        width="100%"
        style={{ height: "calc(100vh - 82px)" }}
      ></iframe>
    </main>
  )
}
