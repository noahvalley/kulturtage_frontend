import {observable} from "mobx"
import {observer} from "mobx-react-lite"

export const Loader = observable({show:false})

export default observer(function LoaderView() {
  return (
    <div className={`overflow-hidden print:hidden fixed z-50 inset-[33%] sm:inset-8 pointer-events-none transition-all duration-500 ${ Loader.show ? 'opacity-100':'opacity-0' }`}>
      <img
        src="/illustrations/swirly.svg"
        alt=""
        className="w-full h-full animate-spin"
      />
    </div>
  )
})
