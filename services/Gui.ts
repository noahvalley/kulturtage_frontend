import { makeAutoObservable } from "mobx"

export const Gui = new (class {
  goBack = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
})()
