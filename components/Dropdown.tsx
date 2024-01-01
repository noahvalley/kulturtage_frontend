import React, {useEffect, useRef, useState} from "react"
import gsap from "gsap"
import Icon from "components/Icon"

interface Props {
  heading: string
  children?: React.ReactNode
}

export default function Dropdown(p: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const elContent = useRef<HTMLDivElement>(null);
  const elButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const duration = 0.3
    gsap.to(elButton.current, { rotation: isOpen ? 0 : 45, duration })
    gsap.to(elContent.current, { height: isOpen ? "auto" : 0, duration })
  })

  return (
    <article className={"overflow-hidden border-y-2"}>
      <header
        className="flex h-10 cursor-pointer select-none items-center justify-between gap-4 sm:h-8"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <h2 className={"xl:text-lg"}>{p.heading}</h2>
        <button ref={elButton} className="flex h-5 w-5 items-center">
          <Icon name="close" />
        </button>
      </header>
      <div ref={elContent} className="h-0 text-sm">
        <div className="pt-2 pb-2">{p.children}</div>
      </div>
    </article>
  )
}
