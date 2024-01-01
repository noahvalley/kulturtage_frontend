interface Props {
  label: string
  type?: "text" | "number" | "email" | "tel"
  area?: boolean
  placeholder?: string
  required?: boolean
  value?: any
  notResponsive?: boolean
  onChange?: (v) => void
}

export default function TextField(p: Props) {
  const Field = p.area ? "textarea" : "input"

  return <div className={p.notResponsive ? "" : `gap-6 grid grid-cols-2 sm:block`}>
    <label htmlFor={p.label}>{p.label}</label>
    <Field
      id={p.label}
      type={p.type ?? "text"}
      required={p.required}
      value={p.value}
      placeholder={p.placeholder ?? "..."}
      rows={6}
      onChange={(e) => p.onChange?.(e.target.value)}
      className="px-2 w-full bg-gray-light placeholder:text-black placeholder:text-opacity-50 invalid:bg-red focus:!bg-gray-light placeholder-shown:!bg-gray-light"
    >{p.area ? p.value : null}</Field>
  </div>
}
