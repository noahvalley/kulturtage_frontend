import useSwr from "swr"
import Link from "components/Link"
import ReactDOM from "react-dom"

export default function Page() {
  const {data} = useSwr("/api/singletons/get/Bewerben")
  if (!data) return null

  return (
    <main className="prose">
      <Danke/>
      <div dangerouslySetInnerHTML={{__html: data.danke}}></div>
      <p>
        <Link href="/mitmachen/bewerben">
          <a>Weitere Bewerbung einreichen</a>
        </Link>
      </p>
    </main>
  )
}

function Danke() {
  return ReactDOM.createPortal(
    <div className="flex fixed inset-0 justify-center items-center opacity-0 pointer-events-none animate-fade">
      <img src="/illustrations/danke.svg" alt="" className="w-full"/>
    </div>
    , document.getElementById("portal")!)
}
