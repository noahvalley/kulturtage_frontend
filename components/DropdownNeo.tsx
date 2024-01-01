import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Icon from "components/Icon"

interface Props {
  prefix?: string | number
  heading: string
  open: boolean
  onToggle?: () => void
  children?: React.ReactNode
}

export default function DropdownNeo(p: Props) {
  const elContent = useRef<HTMLDivElement>(null)
  const elButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const duration = 0.3
    gsap.to(elButton.current, { rotation: p.open ? 0 : 45, duration })
    gsap.to(elContent.current, { height: p.open ? "auto" : 0, duration })
  })

  return (
    <article className={"overflow-hidden border-y-2"}>
      <header
        className="flex h-10 cursor-pointer select-none items-center justify-between gap-4 sm:h-8"
        onClick={() => p.onToggle?.()}
      >
        <h2 className={"flex gap-2 xl:text-lg"}>
          <span className={"w-6 empty:hidden sm:hidden"}>{p.prefix}</span>
          <span>{p.heading}</span>
        </h2>
        <button ref={elButton} className="flex h-5 w-5 items-center">
          <Icon name="close" />
        </button>
      </header>
      <div ref={elContent} className="h-0">
        <div className="pt-2 pb-2">{p.children}</div>
      </div>
    </article>
  )
}
