import { useEffect, useState } from "react";
import { ResultBoard } from "./components/result-board";
import ResultList from "./components/result-list";
import { SingleSiteModalContainer } from "./components/single-site-modal-container";
import { Site } from "../../data/sites";

export function Ranking() {
  const [isLoading, setIsLoading] = useState(true) ;

  const [showSiteModal, setShowSiteModal] = useState(false) ;
  const [displaySiteModalInDom, setDisplaySiteModalInDom] = useState(false) ;

  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  
  // remove spinner after .5s
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  }, [])

  return (
    <section>
      {
        displaySiteModalInDom && (
          <SingleSiteModalContainer
            selectedSite={selectedSite!}
            setDisplaySiteModalInDom={setDisplaySiteModalInDom}
            showSiteModal={showSiteModal}
            setShowSiteModal={setShowSiteModal}
          />
        )
      }
      {
        // show spinner if is loading 
        isLoading ?
          (
            <section className="h-60 flex flex-col gap-4 items-center justify-center px-4 mt-2 mb-4 mx-5 bg-white rounded-lg shadow-md shadow-black/60">
              <img height={80} src="/loader.png" alt="" />
              <h3 className="flex items-center gap-2">
                Result coming soon !!
                <span className="block w-4 h-4 border-2 animate-spin rounded-full border-secondary border-t-white"></span>
              </h3>
            </section>
          )
        :
          (
            <>
              <ResultBoard />
              <ResultList
                setShowModal={setShowSiteModal}
                setDisplayModalInDom={setDisplaySiteModalInDom} 
                setSelectedSite={setSelectedSite} 
              />
            </>
          )
      }
    </section>
  )
}