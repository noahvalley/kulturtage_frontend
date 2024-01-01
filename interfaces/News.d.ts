interface INews {
  _id: string
  datum: string
  titel: string
  bild?: ICmsAsset
  bildformat?: string
  text: string
  link?: string
  linkText?: string
}
