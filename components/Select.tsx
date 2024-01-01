import {useState} from "react"

interface Props {
  label: string
  sufix?: string
  required?: boolean
  options: any[]
  value?: any
  onChange?: (v) => void
}

export default function Select(p: Props) {
  const [open, setOpen] = useState(false)

  return <div className="grid grid-cols-2 gap-6 sm:block">
    <label htmlFor={p.label}>{p.label}</label>
    <div>
      <input
        required={p.required}
        value={p.value}
        className="absolute opacity-0 pointer-events-none"
        onChange={() => null}
      />
      <button
        id={p.label}
        className="flex justify-center items-center w-20 h-6 bg-gray-light"
        type="button"
        onClick={() => setOpen(!open)}
        onContextMenu={(e) => {
          e.preventDefault()
          p.onChange?.("")
        }}
      >
        {p.value ? <div>{p.value}</div> :
          <div
            style={{transform: `rotate3d(${open ? 1 : 0},0,0,180deg)`}}
            className="transition-all duration-700"
          ><Icon/></div>}
      </button>
      <div
        className="overflow-hidden absolute z-10 w-20 bg-white border-b transition-all duration-700"
        style={{height: open ? p.options.length * 24 : 0}}
      >
        {p.options.map((option) => (
          <button
            key={option}
            type="button"
            className="w-full text-center enter:bg-gray-light"
            onClick={() => {
              p.onChange?.(option)
              setOpen(false)
            }}
          >{option}</button>
        ))}
      </div>
      <label
        htmlFor={p.label}
        className="absolute pl-2 translate-x-20 -translate-y-6"
      >{p.sufix ?? ""}</label>
    </div>
  </div>
}

function Icon() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="8.29289"
        y1="9.77818"
        x2="16.7782"
        y2="1.2929"
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1="9.70711"
        y1="9.77815"
        x2="1.22183"
        y2="1.29287"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}
