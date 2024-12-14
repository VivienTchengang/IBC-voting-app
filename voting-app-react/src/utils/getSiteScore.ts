import { Site } from "../data/sites";
import { getAverage } from "./getAverage";

const getSiteScore = (site: Site) => {
  const criteriasAverage = site.criterias.map((item) => getAverage(item.notes)) ;
  const generalAverage = getAverage(criteriasAverage) ;

  return +generalAverage.toFixed(2)
}

export { getSiteScore }