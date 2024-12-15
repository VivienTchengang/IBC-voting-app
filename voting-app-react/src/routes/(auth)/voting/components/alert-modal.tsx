import { Dispatch, SetStateAction } from "react"

interface Props {
  type: 'success' | 'error',
  showAlertModal: boolean,
  setShowAlertModal: Dispatch<SetStateAction<boolean>>
  setDisplayAlertModalInDom: Dispatch<SetStateAction<boolean>>
}

export function AlertModal({ 
  showAlertModal, 
  setDisplayAlertModalInDom, 
  setShowAlertModal,
  type 
}: Props) {

  setTimeout(() => {
    setShowAlertModal(false)
  }, 1700);

  return (
    <section 
      className={`
        absolute top-10 z-50 pl-5 pr-9 left-0 w-full
        ${showAlertModal ? 'move-in' : 'move-out'}
      `}
      onAnimationEnd={(e) => {
        if(e.animationName == 'moveOut') return setDisplayAlertModalInDom(false)
      }}
    >
      {
        type == 'error' ?
          (
            <section className="w-full flex flex-col shadow-md items-center gap-2 py-2 rounded-xl bg-red-300 text-white border-[2px] border-red-500">
              <h2 className="font-medium">
                Please select one or many stars !
              </h2>
              <button
                onClick={() => setShowAlertModal(false)} 
                className="font-semibold bg-red-500 text-white rounded-lg w-20 h-8"
              >
                Got It
              </button>
            </section>
          )
        :
          (
            <section className="w-full flex flex-col shadow-md items-center gap-2 py-2 rounded-xl bg-white border-[2px] border-secondary">
              <h2 className="font-medium">
                Saved successfully !
              </h2>
              <button
                onClick={() => setShowAlertModal(false)} 
                className="font-semibold bg-secondary text-white rounded-lg w-20 h-8"
              >
                OK
              </button>
            </section>
          )
      }
    </section>
  )
}