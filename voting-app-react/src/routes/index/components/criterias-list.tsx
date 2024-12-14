import { Dispatch, SetStateAction } from "react"
import { StartFillSVG } from "../../../components/svg/star-fill-svg"
import { StarSVG } from "../../../components/svg/star-svg"

interface Props {
  criterias: { index: number, title: string, note: number }[],
  setCriterias: Dispatch<SetStateAction<{ index: number, title: string, note: number }[]>>
}

export function CriteriasList({ criterias, setCriterias }: Props) {
  
  const updateCriteria = (index: number, note: number) => {
    setCriterias(
      criterias.map((item) => {
        if(item.index == index) {
          return {
            index,
            note,
            title: item.title
          }
        }

        return item
      })
    )
  }

  const stars = [1, 2, 3, 4, 5] ;

  return (
    <section className="my-2 flex text-sm flex-col gap-2">
      {
        criterias.map((item) => (
          <div key={item.title}>
            <h4 className="capitalize italic font-light">{item.title}:</h4>
            <div className="flex justify-center gap-4 mt-1">
              {
                stars.map((i) => (
                  <span
                    key={i}
                    // if item.note == current star, we remove this star, else we add it  
                    onClick={() => updateCriteria(item.index, item.note >= i ? (i - 1) : i)}
                  >
                    {/* we fill star were note > index  */}
                    { item.note > (i - 1) ? <StartFillSVG size={24} /> : <StarSVG size={24} /> }
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
    </section>
  )
}