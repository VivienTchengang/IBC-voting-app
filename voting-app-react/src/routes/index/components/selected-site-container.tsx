import { StartFillSVG } from "../../../components/svg/star-fill-svg";
import { StarSVG } from "../../../components/svg/star-svg";
import { Site } from "../../../data/sites"
import { getAverage } from "../../../utils/getAverage";

interface Props {
  selectedSite: Site
}

export function SelectedSiteContainer({ selectedSite }: Props) {
  const DISTANCE = 80 ;
  const stars = [
    {
      index: 1,
      xValue: Math.cos(Math.PI) *  DISTANCE,
      yValue: Math.sin(Math.PI) *  DISTANCE ,  
    },
    {
      index: 2,
      xValue: Math.cos((5/4) * Math.PI) *  DISTANCE,
      yValue: Math.sin((5/4) * Math.PI) *  DISTANCE ,  
    },
    {
      index: 3,
      xValue: Math.cos((3/2) * Math.PI) *  DISTANCE,
      yValue: Math.sin((3/2) * Math.PI) *  DISTANCE ,  
    },
    {
      index: 4,
      xValue: Math.cos((7/4) * Math.PI) *  DISTANCE,
      yValue: Math.sin((7/4) * Math.PI) *  DISTANCE ,  
    },
    {
      index: 5,
      xValue: Math.cos(2 * Math.PI) *  DISTANCE,
      yValue: Math.sin(2 * Math.PI) *  DISTANCE ,  
    },
  ]

  // array of average of all criterias 
  const allAverage = selectedSite.criterias.map((item) => getAverage(item.notes)) ;
  const generalAverage = +getAverage(allAverage).toFixed(2)

  return (
    <section className="h-60 px-4 my-4 mx-5 py-4 flex flex-col justify-between bg-white rounded-lg shadow-md shadow-black/60">
      <h2 className="font-light">Average: <span className="font-medium">{generalAverage}/5</span></h2>
      <div className="flex w-full justify-center">
        <div className="relative flex justify-center items-center">
          <img src="/hero.png" height={100} alt="" />
          
          {
            stars.map((item) => (
              <span 
                key={item.index}
                style={{ transform: `translate(${item.xValue}px, ${item.yValue}px)` }}
                className=" absolute"
              >
                {
                  Math.ceil(generalAverage) >= item.index ? <StartFillSVG size={24} /> : <StarSVG size={24} />
                }
              </span>
            ))
          }
        </div>
      </div>
      <h3 className="text-center font-semibold">You can be cooler !!</h3>
    </section>
  )
}