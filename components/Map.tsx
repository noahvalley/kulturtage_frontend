import React from "react"

interface Props {
  standorte: object[]
  active: number
  onSelect: (i: number) => void
}

export default function Map(p: Props) {
  return (
    <figure className="relative">
      <img
        src="/illustrations/map.webp"
        alt="Karte Schaffhausen"
        className={"aspect-1/1 w-full object-cover"}
      />
      {p.standorte.map((s, i) => (
        <button
          key={i}
          className={`absolute flex aspect-1/1 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] leading-none ${
            (i === p.active || p.active === -1) ? "bg-yellow " : "bg-black"
          }`}
          style={{ left: +s["x"] + "%", top: +s["y"] + "%" }}
          onClick={() => p.onSelect(i)}
        >
          {i + 1}
        </button>
      ))}
    </figure>
  )
}
