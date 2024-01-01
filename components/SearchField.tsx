interface Props {
  value?: any
  onChange?: (v) => void
  onBlur?: () => void
}

export default function SearchField(p: Props) {
  return (
    <input
      autoFocus
      type={"text"}
      value={p.value}
      onChange={(e) => p.onChange?.(e.target.value)}
      onBlur={() => p.onBlur?.()}
      className="h-full text-lg w-full text-red"
    />
  )
}
