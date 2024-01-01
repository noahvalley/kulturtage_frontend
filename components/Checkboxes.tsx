import {fn} from "functions/fn"

interface Props {
  label: string
  required?: boolean
  options: any[]
  selected: any[]
  onChange?: (v) => void
  showSelectAll?: boolean
}

export default function Checkboxes(p: Props) {
  return <div className="gap-6 grid grid-cols-2 sm:block">
    <div>{p.label}</div>
    <div>
      {p.showSelectAll && <button
        type="button"
        onClick={() => p.onChange?.(p.selected.length === p.options.length ? [] : p.options)}
        className="text-gray hover:text-black"
      >Alle auswählen</button>}
      <input
        required={p.required}
        value={p.selected}
        className="absolute opacity-0 pointer-events-none"
        onChange={() => null}
      />
      <div className="flex flex-wrap gap-x-4 sm:block">
        {p.options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={p.selected.includes(option)}
              onChange={() => p.onChange?.(fn.xor(p.selected, [option]))}
              className="hidden"
            />
            <span className={`select-none text-gray hover:text-black ${p.selected.includes(option) && "text-black"}`}>{option}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
}
