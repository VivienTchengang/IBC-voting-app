import { Dispatch, SetStateAction } from "react"
import { Site } from "../../../data/sites"
import { getAverage } from "../../../utils/getAverage"
import { StartFillSVG } from "../../../components/svg/star-fill-svg"

interface Props {
  selectedSite: Site,
  showSiteModal: boolean,
  setShowSiteModal: Dispatch<SetStateAction<boolean>>
  setDisplaySiteModalInDom: Dispatch<SetStateAction<boolean>>
}

export function SingleSiteModalContainer({ 
  selectedSite, 
  setDisplaySiteModalInDom,
  setShowSiteModal,
  showSiteModal 
}: Props) {
  
  return (
    <div className="absolute inset-0 flex justify-center items-center z-50">
      <div 
        onClick={() =>setShowSiteModal(false)}
        className={`absolute inset-0 bg-black/40 ${showSiteModal ? 'fade-in' : 'fade-out'}`} 
      />
      <section 
        className={`
          h-60 relative px-4 my-4 w-80 py-4 flex flex-col justify-center items-center gap-4 
          bg-white rounded-lg
          ${showSiteModal ? 'scale-in' : 'scale-out'}
        `}
        onAnimationEnd={(e) => {
          if(e.animationName == 'scaleOut') return setDisplaySiteModalInDom(false)
        }}
      >
        <h2 className="font-medium text-center capitalize">
          { selectedSite.title }
        </h2>
        <section>
          {
            selectedSite.criterias.map((item) => (
              <div 
                key={item.title}
                className="flex items-center gap-4"
              >
                <span className="capitalize underline font-medium w-28">{item.title}:</span>
                <div className="flex">
                  <span className="w-12 font-light">{+getAverage(item.notes).toFixed(2)}</span>
                  <span><StartFillSVG size={24} /></span>
                </div>
              </div>
            ))
          }
        </section>
      </section>
    </div>
  )
}