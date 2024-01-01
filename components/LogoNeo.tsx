import React, {useEffect, useState} from "react"
import Link from "components/Link"

export default function LogoNeo() {
  const [img, setImg] = useState('logo.gif')

  return <Link href="/">
    <img
      onMouseEnter={() => setImg('logo.png')}
      onMouseLeave={() => setImg('logo.gif')}
      className="w-full xl:w-[410px] mb-8"
      src={`/logo/neo/${img}`}
      alt="Kulturtage Schaffhausen"
    />
  </Link>
}
