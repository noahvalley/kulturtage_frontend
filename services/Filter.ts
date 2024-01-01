import {makeAutoObservable, reaction, toJS} from "mobx"
import { Favorites } from "services/Favorites"
import { fn } from "functions/fn"

export const Filter = new (class {
  private all: IVorstellung[] = []
  isListView = false
  showOptions = false
  onlyFavorites = false
  search: null | string = null
  orte: string[] = []
  tags: string[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    reaction(
      () => [
        this.onlyFavorites,
        this.isListView,
        this.search,
        this.orte,
        this.tags,
      ],
      () => {
        window.scrollTo(0, 1) // make sure scroll event is triggered
        window.scrollTo(0, 0)
      }
    )
  }

  // data
  //////////////////////////////////////////////////////////////////////////////
  set(vorstellungen: IVorstellung[]) {
    this.all = vorstellungen ?? []
  }

  get filtered() {
    let result = this.all
    if (this.onlyFavorites) result = result.filter((x) => Favorites.has(x._id))
    if (this.orte.length)
      result = result.filter((x) => {
        return this.orte.includes(x.event.ort.name)
      })
    if (this.tags.length)
      result = result.filter((x) => {
        return fn.intersection(
          this.tags,
          x.event.tags.map((x) => x.name)
        ).length
      })
    if (this.search)
      result = result.filter((x) => {
        const haystack = [x.event.titel, x.event.untertitel, x.event.text, x.event.credits]
          .join("")
          .toLowerCase()
          .trim()
        const needle = this.search!.toLowerCase().trim()
        return haystack.includes(needle)
      })
    return result
  }

  private sort(vorstellungen: IVorstellung[]) {
    return [...vorstellungen].sort((a, b) => {
      const toValue = (v: IVorstellung) =>
        +v.uhrzeitStart.replace(/\D/g, "") || 0
      return toValue(a) - toValue(b)
    })
  }

  hasForDate(date: string) {
    return this.filtered.some((x) => x.datum === date)
  }

  hasFavorites() {
    return !!this.all.find((x) => Favorites.has(x._id))
  }

  hasFilter() {
    return this.tags.length || this.orte.length
  }

  getForDate(date: string) {
    return this.sort(this.filtered.filter((x) => x.datum === date))
  }

  get hasSearch() {
    return this.search !== null
  }

  // settings
  //////////////////////////////////////////////////////////////////////////////
  toggleListView() {
    this.isListView = !this.isListView
  }

  toggleOptions() {
    this.showOptions = !this.showOptions
  }

  toggleFavorites() {
    this.onlyFavorites = !this.onlyFavorites
  }

  toggleSearch() {
    this.search = this.search === null ? "" : null
  }
})()
