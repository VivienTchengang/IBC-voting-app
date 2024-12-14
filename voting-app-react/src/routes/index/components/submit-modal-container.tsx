import { Dispatch, SetStateAction, useContext, useState } from "react"
import { DataContext } from "../../layout"
import { Site } from "../../../data/sites"

interface Props {
  selectedSite: Site,
  criterias: { index: number, title: string, note: number }[],
  setCriterias: Dispatch<SetStateAction<{ index: number, title: string, note: number }[]>>,
  showSubmitModal: boolean,
  setShowAlertModal: Dispatch<SetStateAction<boolean>>
  setDisplayAlertModalInDom: Dispatch<SetStateAction<boolean>>
  setShowSubmitModal: Dispatch<SetStateAction<boolean>>
  setDisplaySubmitModalInDom: Dispatch<SetStateAction<boolean>>
}

export default function SubmitModalContainer({ 
  selectedSite,
  criterias,
  setCriterias,
  setDisplaySubmitModalInDom,
  showSubmitModal, 
  setShowSubmitModal,
  setDisplayAlertModalInDom,
  setShowAlertModal 
}: Props) {

  const { sites, setSites } = useContext(DataContext)!
  const [isLoading, setIsLoading] = useState(false) ;
  
  const handleReset = () => {
    const items = criterias.map((item) => ({...item, note: 0}))

    setCriterias(items)
  }
  
  const handleSubmit = () => {
    if(isLoading) return 

    setIsLoading(true)

    setTimeout(() => {
      const correspondingSite = sites.find((item) => item.title == selectedSite!.title)! ;
      // update criterias of corresponding site 
      correspondingSite.criterias = correspondingSite.criterias.map((item) => (
        {
          title: item.title,
          notes: [...item.notes, criterias.find((i) => i.title == item.title)!.note]
        }
      ))

      setSites(sites.map((item) => {
        if(item.title != selectedSite!.title) return item ;

        return correspondingSite
      }))
      
      setIsLoading(false)
      // hide submit modal
      setShowSubmitModal(false)

      handleReset()

      // show success message 
      setShowAlertModal(true)
      setDisplayAlertModalInDom(true)
    }, 600);
  }

  return (
  
    <div className="absolute inset-0 flex justify-center items-center z-50">
      <div 
        onClick={() => {
          if(isLoading) return
          setShowSubmitModal(false)
        }}
        className={`absolute inset-0 bg-black/40 ${showSubmitModal ? 'fade-in' : 'fade-out'}`} 
      />
      <section 
        className={`
          h-60 relative px-4 my-4 w-80 py-4 flex flex-col justify-center items-center gap-4 
          bg-white rounded-lg
          ${showSubmitModal ? 'scale-in' : 'scale-out'}
        `}
        onAnimationEnd={(e) => {
          if(e.animationName == 'scaleOut') return setDisplaySubmitModalInDom(false)
        }}
      >
        <h2 className="font-medium text-center">
          Do you want to confirm the vote ?
        </h2>
        <div className="flex w-full justify-center gap-6 font-light mt-6 mb-2 text-sm">
          <button
            onClick={() => {
              if(isLoading) return
              setShowSubmitModal(false)
            }}
            className="h-10 w-24 flex items-center overflow-hidden justify-center border border-black rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className={`h-10 w-24 flex items-center justify-center bg-secondary/85 hover:bg-secondary duration-150 text-white rounded-md`}
          >
            {
              isLoading ?
                <span className="block w-6 h-6 animate-spin border-2 rounded-full border-white border-t-transparent"/>
              :
                <span>Confirm</span>
            }
          </button>
        </div>
      </section>
    </div>
  )
}