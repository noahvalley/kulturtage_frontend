import Navigation from "components/Navigation"
import NavMobile from "components/NavMobile"
import LoaderView from "components/Loader"
import { CONFIG } from "CONFIG"
import IdleAnimation from "components/IdleAnimation"
import { useRouter } from "next/router"
import OverlayView from "components/OverlayView"

export default function Layout({ children }) {
  const router = useRouter()
  const wideContent =
    router.asPath.startsWith("/programm") ||
    router.asPath.startsWith("/news") ||
    router.asPath.startsWith("/standorte") ||
    router.asPath.startsWith("/tipps")

  return (
    <>
      <div className="grid grid-cols-4 items-start print:block sm:block">
        <Navigation />
        <div
          className={`relative col-end-5 row-start-1 ${
            wideContent ? "col-start-2" : "col-start-3"
          }`}
        >
          <div
            id="page"
            className="min-h-screen border-[18px] border-white bg-white sm:border-[12px] sm:pb-[46px]"
          >
            {children}
          </div>
        </div>
      </div>
      <NavMobile />
      {/*<div id="portal" className="fixed z-10"></div>*/}
      {/* <OverlayView /> */}
      <LoaderView />
      {CONFIG.idleAnimation ? <IdleAnimation /> : null}
    </>
  )
}
