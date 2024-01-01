import { observable } from "mobx"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { fn } from "functions/fn"
import {CONFIG} from "CONFIG"

type Image = {
  index: number
  x: number
  y: number
}

const d = observable({
  sensor: 0,
  images: [] as Image[],
})

export default observer(function IdleAnimation() {
  useEffect(() => {
    const trySpawn = () => {
      d.sensor++
      if (d.sensor <= 2) return
      d.images.push({
        index: fn.random(1, 12),
        x: fn.random(40, window.innerWidth - 40),
        y: fn.random(40, window.innerHeight - 40),
      })
    }
    const interval = setInterval(trySpawn, 10 * 1000)
    const reset = () => {
      d.sensor = 0
      d.images = []
    }
    window.addEventListener("mousedown", reset)
    window.addEventListener("touchstart", reset)
    window.addEventListener("touchend", reset)
    window.addEventListener("keydown", reset)
    window.addEventListener("scroll", reset)
    window.addEventListener("touchmove", reset)
    return () => {
      clearInterval(interval)
      window.removeEventListener("mousedown", reset)
      window.removeEventListener("touchstart", reset)
      window.removeEventListener("touchend", reset)
      window.removeEventListener("keydown", reset)
      window.removeEventListener("scroll", reset)
      window.removeEventListener("touchmove", reset)
    }
  }, [])

  return (
    <div className="overflow-hidden print:hidden fixed inset-0 pointer-events-none">
      {d.images.map((img, i) => (
        <img
          key={i}
          src={`/screensaver/Tauben-${img.index
            .toString()
            .padStart(2, "0")}.svg`}
          alt=""
          className="fixed -translate-x-1/2 -translate-y-1/2"
          style={{ top: img.y, left: img.x, height: img.index <= 3 ? 20 : 40 }}
        />
      ))}
    </div>
  )
})
