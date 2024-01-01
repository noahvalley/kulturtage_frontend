import React, { useEffect, useState } from "react"
import L from "leaflet"
import { fn } from "functions/fn"
import { useLocalObservable } from "mobx-react-lite"

// https://xd.adobe.com/view/cd42f471-ba92-4496-b511-6ad9b4a6f6a6-9811/

interface Props {
  standorte: IStandort[]
  active: string
  onSelect: (name: string) => void
}

export default function MapNeo(p: Props) {
  const s = useLocalObservable(() => ({
    map: null as unknown as L.Map,
    marker: null as unknown as L.LayerGroup,
  }))

  function setup() {
    console.log("setup")
    if (s.map) {
      s.map.off()
      s.map.remove()
    }
    s.map = L.map("map", {attributionControl: false})
    s.map.setView([47.697, 8.635], 16)
    const img = "/illustrations/map.webp"
    const start = [47.6902, 8.6241]
    const end = [start[0] + 0.0152, start[1] + 0.022]
    // @ts-ignore
    L.imageOverlay(img, [start, end], { opacity: 1.0 }).addTo(s.map)
    s.map.on("contextmenu", (e) => onContext(e.latlng))
    makeMarker()
  }

  function makeMarker() {
    if (s.marker) {
      s.marker.off()
      s.marker.remove()
    }
    s.marker = new L.LayerGroup()
    p.standorte.forEach((x, i) => {
      if (!(x.lng && x.lat)) return
      const isBlack = p.active && x.name !== p.active
      const m = L.marker([x.lat, x.lng], {
        icon: new L.DivIcon({
          html: `${i + 1}`,
          className: isBlack ? "leaflet-marker-icon-black" : "",
          iconSize: [20, 20],
        }),
      }).addTo(s.marker)
      m.on("click", (e) => onClick(e.latlng))
    })
    s.marker.addTo(s.map)
  }

  function onContext(pos: L.LatLng) {
    alert(`lat: ${pos.lat}\nlng: ${pos.lng}`)
  }

  function onClick(pos: L.LatLng) {
    const standort = p.standorte.find(
      (x) => x.lat == pos.lat && x.lng == pos.lng
    )
    console.log(standort?.name)
    p.onSelect(standort?.name ?? "")
  }

  useEffect(() => {
    setup()
  }, [])

  useEffect(() => {
    makeMarker()
  }, [p.active])

  return <div id="map" className="h-screen fixed w-[50vw] top-[0px]"></div>
}
