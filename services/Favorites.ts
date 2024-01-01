import { makeAutoObservable } from "mobx"
import { fn } from "functions/fn"

export const Favorites = new (class {
  private all: string[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    if (typeof window !== "undefined") {
      this.all = JSON.parse(localStorage.getItem("favorites") ?? "[]")
    }
  }

  add(id: string) {
    this.all.push(id)
    localStorage.setItem("favorites", JSON.stringify(this.all))
  }

  remove(id: string) {
    fn.pull(this.all, id)
    localStorage.setItem("favorites", JSON.stringify(this.all))
  }

  toggle(id: string) {
    this.all = fn.xor(this.all, [id])
    localStorage.setItem("favorites", JSON.stringify(this.all))
  }

  has(id: string) {
    return this.all.includes(id)
  }
})()
