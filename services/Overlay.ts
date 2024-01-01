import { makeAutoObservable } from "mobx"

export const Overlay = new (class {
  name = ""

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
})()
