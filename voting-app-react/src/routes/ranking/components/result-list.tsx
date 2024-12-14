import { Dispatch, SetStateAction, useContext } from "react"
import { DataContext } from "../../layout"
import { StartFillSVG } from "../../../components/svg/star-fill-svg"
import { GoldMedal } from "../../../components/svg/gold-medal"
import { SilverMedal } from "../../../components/svg/silver-medal"
import { BronzeMedal } from "../../../components/svg/bronze-medal"
import { getSiteScore } from "../../../utils/getSiteScore"
import { Site } from "../../../data/sites"

interface Props {
  setSelectedSite: Dispatch<SetStateAction<Site | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
  setDisplayModalInDom: Dispatch<SetStateAction<boolean>>
}

export default function ResultList({ setSelectedSite, setDisplayModalInDom, setShowModal }: Props) {
  const { sites } = useContext(DataContext)!
  
  const sortedSites = sites.sort((a, b) => getSiteScore(b) - getSiteScore(a)) ;

  return (
    <section>
      {
        sortedSites.map((item, index) => (
          <div
            onClick={() => {
              setSelectedSite(item)
              setDisplayModalInDom(true)
              setShowModal(true)
            }}
            key={item.title} 
            className="h-16 cursor-pointer flex items-center justify-between px-4 mt-2 mx-5 bg-white rounded-lg shadow-md shadow-black/60"
          >
            { index == 0 && (<GoldMedal size={40} />) }
            { index == 1 && (<SilverMedal size={40} />) }
            { index == 2 && (<BronzeMedal size={40} />) }
            <div>
              <span className="capitalize">{item.title}</span>
              <div className="flex gap-4 items-center">
                <span className="font-light">Score: <span className="font-medium">{getSiteScore(item)}/5</span></span>
                <StartFillSVG size={20} />
              </div>
            </div>
            <span className="text-secondary text-sm">Number {index + 1}</span>
          </div>
        ))
      }
    </section>
  )
}