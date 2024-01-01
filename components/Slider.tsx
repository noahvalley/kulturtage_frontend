import React, { useRef, useState } from "react"
import gsap from "gsap"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useSwipeable } from "react-swipeable"

interface Props {
  paths: string[]
}

export default observer((p: Props) => {
  const s = useLocalObservable(() => ({
    index: 1,
    isMoving: false,
  }))
  const container = useRef<HTMLDivElement>(null)
  const handlers = useSwipeable({
    onSwipedLeft: () => move(1),
    onSwipedRight: () => move(-1),
    trackMouse: true,
  })

  async function move(direction: number) {
    if (p.paths.length <= 1) return
    if (s.isMoving) return
    s.isMoving = true
    s.index += direction

    await gsap.to(container.current, {
      x: `-${s.index * 100}%`,
      duration: 0.4,
    })

    if (s.index === p.paths.length + 1) s.index = 1
    else if (s.index === 0) s.index = p.paths.length
    await gsap.set(container.current, { x: `-${s.index * 100}%` })

    console.log("moved to", s.index)
    s.isMoving = false
  }

  return (
    <article
      {...handlers}
      className={"relative aspect-4/3 overflow-x-hidden sm:-mx-3 sm:w-screen"}
    >
      <div ref={container} className="flex absolute inset-0 translate-x-[-100%]">
        {[p.paths.at(-1), ...p.paths, p.paths.at(0)].map((path, i) => (
          <img
            key={i}
            src={path}
            alt={"slider"}
            className={"aspect-4/3 h-full border-red object-cover"}
          />
        ))}
      </div>
      <button
        onClick={() => move(-1)}
        hidden={p.paths.length <= 1}
        className={"absolute left-0 top-0 bottom-0 p-4 text-lg text-white"}
      >
        ←
      </button>
      <button
        onClick={() => move(1)}
        hidden={p.paths.length <= 1}
        className={"absolute right-0 top-0 bottom-0 p-4 text-lg text-white"}
      >
        →
      </button>
    </article>
  )
})
