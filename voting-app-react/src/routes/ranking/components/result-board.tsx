import { useContext } from "react"
import { DataContext } from "../../layout"
import { getSiteScore } from "../../../utils/getSiteScore";

export function ResultBoard() {
  const { sites } = useContext(DataContext)!

  const sortedSites = sites.sort((a, b) => getSiteScore(b) - getSiteScore(a)) ;

  return (
    <section className="h-60 relative flex flex-col gap-4 items-center justify-center px-4 mt-2 mb-4 mx-5 bg-white rounded-lg shadow-md shadow-black/60">
      <div className="absolute">
        <img height={80} src="/result-bg.png" alt="" />
      </div>
      <section className="relative h-full w-full flex flex-col items-center justify-between py-4">
        <div>
          <img src="/result-header.png" alt="" />
        </div>
        <section className="flex flex-col font-medium gap-2">
          <article className="h-28 gap-1 flex items-end">
            <div>
              <span className="capitalize flex justify-center">{sortedSites[2].title}</span>
              <div className="bg-secondary rounded-tl-3xl rounded-tr-3xl text-center pt-2 h-10 w-20">
                <span className="text-2xl text-white font-bold">3</span>
              </div>
            </div>
            <div>
              <span className="capitalize flex justify-center">{sortedSites[0].title}</span>
              <div className="bg-secondary rounded-tl-3xl rounded-tr-3xl text-center pt-2 h-24 w-20">
                <span className="text-2xl text-white font-bold">1</span>
              </div>
            </div>
            <div>
              <span className="capitalize flex justify-center">{sortedSites[1].title}</span>
              <div className="bg-secondary rounded-tl-3xl rounded-tr-3xl text-center pt-2 h-14 w-20">
                <span className="text-2xl text-white font-bold">2</span>
              </div>
            </div>
          </article>
          <h3 className="flex items-center gap-2 font-semibold">
            Congratulation !!
          </h3>
        </section>
      </section>
    </section>
  )
}