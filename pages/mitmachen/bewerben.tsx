import TextField from "components/TextField"
import {autorun, makeAutoObservable} from "mobx"
import {observer} from "mobx-react-lite"
import Button from "components/Button"
import Checkboxes from "components/Checkboxes"
import Select from "components/Select"
import axios from "axios"
import {useRef, useState} from "react"
import useSwr from "swr"
import {Loader} from "components/Loader"
import Link from "components/Link"
import {fn} from "functions/fn"

class Form {
  name = ""
  email = ""
  telefon = ""
  website = ""
  kurzbeschreibung = ""
  einzigartigkeit = ""
  sparten: string[] = []
  sparteSonstiges = ""
  anzahl = ""
  gestaltung: string[] = []
  altersgruppen: string[] = []
  dauer = ""
  platz = ""
  outdoor = ""
  outdoorBemerkung = ""
  kommentar = ""
  dossier = ""

  constructor() {
    makeAutoObservable(this)
    const pending = localStorage.getItem("bewerbung")
    if (pending) Object.assign(this, JSON.parse(pending))
    autorun(() => localStorage.setItem("bewerbung", JSON.stringify(this)))
  }
}

export default observer(function Page() {
  const [form] = useState(new Form())
  const refLink = useRef<HTMLAnchorElement>(null)

  const {data} = useSwr<Data>("/api/singletons/get/Bewerben")
  if (!data) return null

  async function submit() {
    Loader.show = true
    await Promise.all([
      await axios.post("/api/form", form),
      await fn.sleep(1000),
    ])
    Loader.show = false
    localStorage.setItem("bewerbung", "")
    refLink.current?.click()
  }

  // TODO: force deactivation for now, backend for submissions may not exist
  data.deaktiviert = true

  return (
    <main>
      <Link href="/mitmachen/danke"><a ref={refLink}></a></Link>

      <div className="prose">
        <h1 className="xl:!text-base">{data.titel}</h1>
      </div>
      {/*{data.deaktiviert ?*/}
      {data.deaktiviert ?
        <div dangerouslySetInnerHTML={{__html: data.deaktiviertText}}></div> :
        <form
          noValidate={false}
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <div className="grid grid-cols-2 gap-6 sm:block">
            <div className="mb-6">{data.labels.angaben}</div>
            <div className="space-y-6">
              <TextField
                label={data.labels.name}
                required
                value={form.name}
                onChange={(v) => form.name = v}
                notResponsive
              />
              <TextField
                label={data.labels.mail}
                type="email"
                required
                value={form.email}
                onChange={(v) => form.email = v}
                notResponsive
              />
              <TextField
                label={data.labels.telefon}
                type="tel"
                required
                value={form.telefon}
                onChange={(v) => form.telefon = v}
                notResponsive
              />
              <TextField
                label={data.labels.website}
                type="text"
                value={form.website}
                onChange={(v) => form.website = v}
                notResponsive
              />
            </div>
          </div>
          <TextField
            label={data.labels.kurzbeschreibung}
            area
            required
            value={form.kurzbeschreibung}
            onChange={(v) => form.kurzbeschreibung = v}
          />
          <TextField
            label={data.labels.einzigartigkeit}
            area
            required
            value={form.einzigartigkeit}
            onChange={(v) => form.einzigartigkeit = v}
          />
          <div>
            <Checkboxes
              label={data.labels.sparte}
              options={[...data.optionen.sparten.split(/\s*,\s*/), "Sonstiges"]}
              selected={form.sparten}
              required
              onChange={(v) => form.sparten = v}
            />
            {form.sparten.includes("Sonstiges") && (
              <TextField
                label=""
                value={form.sparteSonstiges}
                required
                onChange={(v) => form.sparteSonstiges = v}
              />
            )}
          </div>
          <Select
            label={data.labels.anzahl}
            sufix="Personen"
            options={data.optionen.anzahl.split(/\s*,\s*/)}
            value={form.anzahl}
            required
            onChange={(v) => form.anzahl = v}
          />
          <Checkboxes
            label={data.labels.gestaltung}
            options={data.optionen.gestaltung.split(/\s*,\s*/)}
            selected={form.gestaltung}
            required
            onChange={(v) => form.gestaltung = v}
          />
          <Checkboxes
            label={data.labels.altersgruppen}
            options={data.optionen.altersgruppen.split(/\s*,\s*/)}
            selected={form.altersgruppen}
            showSelectAll
            required
            onChange={(v) => form.altersgruppen = v}
          />
          {!form.gestaltung.includes("Installation") && (
            <Select
              label={data.labels.dauer}
              sufix="Minuten"
              options={data.optionen.dauer.split(/\s*,\s*/)}
              value={form.dauer}
              required
              onChange={(v) => form.dauer = v}
            />
          )}
          <TextField
            label={data.labels.platz}
            area
            required
            value={form.platz}
            onChange={(v) => form.platz = v}
          />
          <Select
            label={data.labels.outdoor}
            options={["Ja", "Nein"]}
            value={form.outdoor}
            required
            onChange={(v) => form.outdoor = v}
          />
          <TextField
            label=""
            placeholder="Bemerkung..."
            area
            value={form.outdoorBemerkung}
            onChange={(v) => form.outdoorBemerkung = v}
          />
          <TextField
            label={data.labels.kommentar}
            area
            value={form.kommentar}
            onChange={(v) => form.kommentar = v}
          />
          <TextField
            label={data.labels.dossier}
            area
            value={form.dossier}
            onChange={(v) => form.dossier = v}
          />
          <div className="xl:grid xl:grid-cols-2 xl:gap-6">
            <div></div>
            <Button submit>Abschicken</Button>
          </div>
        </form>
      }
    </main>
  )
})

////////////////////////////////////////////////////////////////////////////////

interface Data {
  titel: string
  labels: Labels
  optionen: Optionen
  deaktiviert: boolean
  deaktiviertText: string
}

interface Labels {
  angaben: string;
  name: string;
  email: string;
  telefon: string;
  website: string;
  mail: string;
  kurzbeschreibung: string;
  einzigartigkeit: string;
  sparte: string;
  anzahl: string;
  gestaltung: string;
  altersgruppen: string;
  dauer: string;
  platz: string;
  outdoor: string;
  kommentar: string;
  dossier: string;
}

interface Optionen {
  sparten: string;
  anzahl: string;
  gestaltung: string;
  altersgruppen: string;
  dauer: string;
  telefon: string;
  website: string;
}
