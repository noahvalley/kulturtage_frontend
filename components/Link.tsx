import React from "react"
import { useRouter } from "next/router"
import gsap from "gsap"
import { fn } from "functions/fn"
import { className } from "postcss-selector-parser"

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  blank?: boolean
}

export default function Link(p: Props) {
  const router = useRouter()

  async function push() {
    if (!p.href) return
    if (p.blank) {
      window.open(p.href, "_blank")
      return
    }

    const page = document.getElementById("page")!
    await gsap.to(page, { opacity: 0, duration: 0.2, ease: "none" })
    await router.push(p.href, undefined, { scroll: false, shallow: true })
    window.scrollTo(0, 0)
    await gsap.to(page, { opacity: 1, duration: 0.2, ease: "none" })
    gsap.set(page, { clearProps: "all" })
  }

  return (
    <div
      className={`
        base:contents 
        ${p.href ? "base:cursor-pointer" : ""} 
        ${p.className}
      `}
      onClick={push}
    >
      {p.children}
    </div>
  )
}
