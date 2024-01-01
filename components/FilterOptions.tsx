import { fn } from "functions/fn"
import { Filter } from "services/Filter"
import { useState } from "react"

interface Props {
  options: any[]
  selected: any[]
  onChange: (v) => void
}

export default function FilterOptions(p: Props) {
  const [key, setKey] = useState(0)

  function toggle(o) {
    console.log(o)
    p.onChange(fn.xor(p.selected, [o]))
    setKey(key + 1)
  }

  function reset() {
    p.onChange([])
    setKey(key + 1)
  }

  return (
    <div key={key}>
      <div className="flex h-full flex-wrap items-center gap-x-3 gap-y-2 whitespace-nowrap text-sm leading-none">
        <button
          onClick={reset}
          className={`hover:text-black ${
            p.selected.length ? "opacity-50" : "opacity-[99%]"
          }`}
        >
          Alle
        </button>
        {p.options.map((o) => (
          <button
            key={o}
            onClick={() => toggle(o)}
            className={`opacity-50 xl:hover:text-black ${
              p.selected.length && p.selected.includes(o) ? "opacity-[99%]" : ""
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
