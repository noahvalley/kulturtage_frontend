import React from "react"

interface Props {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  submit?: boolean
}

export default function Button(p: Props) {
  return <button
    type={p.submit ? "submit" : "button"}
    disabled={p.disabled}
    className="text-center w-full bg-gray-light enter:bg-blue enter:text-white"
    onClick={() => p.onClick?.()}
  >{p.children}</button>
}
