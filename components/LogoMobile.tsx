import React from "react"

export default function Logo() {
  return <div className='hidden sm:block'>
    <img
      className="w-full max-w-sm mb-8"
      src={`/logo/mobile.gif`}
      alt="Kulturtage Schaffhausen"
    />
  </div>
}
