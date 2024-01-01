import React from "react"

interface Props {
  tags: ITag[]
  className?: string
}

export default function Button(p: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {p.tags.map((t) => (
        <li
          key={t._id}
          className={`p-1 text-sm leading-none base:bg-yellow ${p.className}`}
        >
          {t.name}
        </li>
      ))}
    </ul>
  )
}
