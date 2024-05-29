import React, { useState } from "react"
import Link from "components/Link"

export default function LogoNeo() {
  const [img, setImg] = useState("logo.png")

  return (
    <Link href="/">
      <img
        onMouseEnter={() => setImg("logo.png")}
        onMouseLeave={() => setImg("logo.png")}
        className="mb-8 w-full xl:w-[410px]"
        src={`/logo/neo/${img}`}
        alt="Kulturtage Schaffhausen"
      />
    </Link>
  )
}
