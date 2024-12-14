import { Dispatch, SetStateAction, useContext } from "react"
import { DataContext } from "../../layout"
import { Site } from "../../../data/sites";

interface Props {
  selectedSite: Site | null,
  setSelectedSite: Dispatch<SetStateAction<Site | null>>
}

export function HeaderSiteList({ selectedSite, setSelectedSite }: Props) {
  const { sites } = useContext(DataContext)! ;

  return (
    <section className="flex items-center justify-between">
      {
        sites.map((item) => (
          <span
            key={item.title}
            onClick={() => setSelectedSite(item)}
            className={`
              border rounded font-light capitalize border-black flex h-10 px-5 items-center justify-center cursor-pointer
              ${selectedSite?.title == item.title ? 'bg-secondary text-white border-secondary' : 'text-black'} duration-100 
            `}
          >
            {item.title}
          </span>
        ))
      }
    </section>
  )
}