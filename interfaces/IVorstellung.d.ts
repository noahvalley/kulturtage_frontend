interface IVorstellung {
  _id: string
  datum: "Donnerstag" | "Freitag" | "Samstag" | "Sonntag" | "Rund um die Uhr"
  uhrzeitStart: string
  uhrzeitEnde: string
  dauer: number
  event: IEvent
}
