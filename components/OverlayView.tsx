import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"
import { fn } from "functions/fn"
import ReactDOM from "react-dom"
import { Overlay } from "services/Overlay"

export default observer(() => {
  const router = useRouter()

  let img = Overlay.name + ".svg"

  if (router.asPath === "/" && !img)
    img = fn.isMobile() ? "_intro-mobile.gif" : "_intro.gif"

  if (!Overlay.name) return null

  return (
    <div className="pointer-events-none print:hidden sm:hidden fixed inset-0 z-10 flex items-center justify-center">
      <img src={`/nav-overlays/${img}`} alt="" className={"w-full"} />
    </div>
  )
})
