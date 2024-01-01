import React, { useEffect, useRef } from "react"

interface Props {
  children?: React.ReactNode
}

export default function Masonry(p: Props) {
  const elRoot = useRef<HTMLDivElement>(null)

  function calculate() {
    if (!elRoot.current) return
    const items = Array.from(elRoot.current.children) as HTMLElement[]
    items.forEach((item) => {
      if (item.children.length !== 1)
        throw "masonry: each item should have exactly one child element!"
      const wrapper = item.firstChild as HTMLElement
      item.style.gridRowEnd =
        "span " + Math.ceil(wrapper.getBoundingClientRect().height)
    })
  }

  useEffect(() => {
    calculate()
    new ResizeObserver(() => calculate()).observe(elRoot.current!)
  }, [])

  return (
    <div
      ref={elRoot}
      className={"grid items-start grid-cols-2 gap-x-4 sm:block xl:grid-cols-3"}
    >
      {p.children}
    </div>
  )
}
