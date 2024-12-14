import { useContext, useState } from "react"
import { HeaderSiteList } from "./components/header-site-list"
import { DataContext } from "../layout"
import { Site } from "../../data/sites"
import { SelectedSiteContainer } from "./components/selected-site-container"
import { CriteriasList } from "./components/criterias-list"
import { ButtonsContainer } from "./components/buttons-container"
import SubmitModalContainer from "./components/submit-modal-container"
import { AlertModal } from "./components/alert-modal"

export function Root() {
  const { sites, criterias: dataCriterias } = useContext(DataContext)!
  const [selectedSite, setSelectedSite] = useState<Site | null>(sites[0])

  const [showSubmitModal, setShowSubmitModal] = useState(false) ;
  const [displaySubmitModalInDom, setDisplaySubmitModalInDom] = useState(false) ;

  // show success message 
  const [showAlertModal, setShowAlertModal] = useState(false) ;
  const [displayAlertModalInDom, setDisplayAlertModalInDom] = useState(false) ;
  
  const [criterias, setCriterias] = useState(
    dataCriterias.map((item, index) => ({
      index,
      title: item,
      note: 0
    }))
  )

  return (
    <section>
      {
        displayAlertModalInDom && (
          <AlertModal
            type="success"
            showAlertModal={showAlertModal} 
            setDisplayAlertModalInDom={setDisplayAlertModalInDom}
            setShowAlertModal={setShowAlertModal}
          />
        )
      }
      {
        displaySubmitModalInDom && (
          <SubmitModalContainer
            criterias={criterias}
            setCriterias={setCriterias}
            selectedSite={selectedSite!}
            setDisplaySubmitModalInDom={setDisplaySubmitModalInDom}
            setShowSubmitModal={setShowSubmitModal}
            showSubmitModal={showSubmitModal}
            setShowAlertModal={setShowAlertModal}
            setDisplayAlertModalInDom={setDisplayAlertModalInDom} 
          />
        )
      }
      <section className="bg-white h-24 flex flex-col justify-center gap-2 px-5">
        <h1 className="font-medium">Sites icam:</h1>
        <HeaderSiteList selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
      </section>

      { 
        selectedSite != null && 
          ( <SelectedSiteContainer selectedSite={selectedSite} /> ) 
      }
      
      <section className="py-2 px-4 mb-4 mx-5 bg-white rounded-lg shadow-md shadow-black/60">
        <h2 className="font-medium">Criterias</h2>
        <CriteriasList criterias={criterias} setCriterias={setCriterias} />
        
        <ButtonsContainer
          criterias={criterias}
          setCriterias={setCriterias}
          setDisplaySubmitModalInDom={setDisplaySubmitModalInDom}
          setShowSubmitModal={setShowSubmitModal} 
        />
      </section>
    </section>
  )
}