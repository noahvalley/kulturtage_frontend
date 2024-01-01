import React, {useEffect, useState} from "react"
import Link from "components/Link"
import {fn} from "functions/fn"

export default function Logo() {
  const [logoVariant, setLogoVariant] = useState(1)
  useEffect(() => {
    setLogoVariant(fn.random(1, 3))
  }, [])

  return <Link href="/">
    <img
      className="w-full xl:w-[410px] opacity-[35%] hover:opacity-100 mb-8"
      src={`/logo/logo-${logoVariant}.svg`}
      alt="Kulturtage Schaffhausen"
    />
  </Link>
}
