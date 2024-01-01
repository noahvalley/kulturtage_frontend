import { useRouter } from "next/router"
import { useEffect } from "react"
import { Overlay } from "services/Overlay"

export default function Page() {
  const router = useRouter()
  const isMobile = window.innerWidth < 768
  if (!isMobile) router.replace("/news")

  return (
    <main className="hidden sm:block">
      <img
        src="/illustrations/home.gif"
        alt="Kulturtage SH"
        className={"w-full"}
      />
    </main>
  )
}
