interface IEvent {
  _id: string
  titel: string
  untertitel: string
  ort: IOrt
  tags: ITag[]
  svg: ICmsAsset
  bild: ICmsAsset
  mehrBilder: ICmsAsset[]
  text: string
  iframe: string
  bio: string
  credits: string
  links: {
    value: {
      text: string
      link: string
    }
  }[]
  infos: string
}
