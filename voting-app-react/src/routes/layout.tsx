import { NavLink, Outlet } from "react-router-dom";
import { RankingSVG } from "../components/svg/ranking-svg";
import { VotingSVG } from "../components/svg/voting-svg";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Criteria, criterias, Site, sites as dataSites }  from "../data/sites";

export type DataContextType = {
  sites: Site[],
  setSites: Dispatch<SetStateAction<Site[]>>,
  criterias: Criteria[],
}

export const DataContext = createContext<DataContextType | null>(null)

export function Layout() {
  const [sites, setSites] = useState(dataSites)
  
  return (
    <DataContext.Provider value={{ criterias, sites, setSites }}>
      <section className="md:min-h-[580px] h-dvh w-full bg-slate-200 flex justify-center items-center md:py-4">
        <section className="w-full h-full relative flex flex-col md:w-96 bg-primary">
          <main className="h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden">
            {/* content of our application  */}
            <Outlet />
          </main>
          <footer className="h-20 bg-white font-light text-sm rounded-tl-3xl rounded-tr-3xl flex items-center justify-between px-5">
            {/* link to voting section  */}
            <NavLink 
              to={'/'}
              className={({ isActive }) => `flex flex-col items-center ${isActive && 'link-active'} `}
            >
              <span className="flex w-10 h-10 rounded-full bg-transparent justify-center duration-150 items-center">
                <VotingSVG size={28} />
              </span>
              <span>Voting</span>
            </NavLink>
            {/* link to ranking section  */}
            <NavLink
              to={'/ranking'} 
              className={({ isActive }) => `flex flex-col items-center ${isActive && 'link-active'} `}
            >
              <span className="flex w-10 h-10 bg-transparent rounded-full justify-center duration-150 items-center">
                <RankingSVG size={28} />
              </span>
              <span>Ranking</span>
            </NavLink>
          </footer>
        </section>
      </section>
    </DataContext.Provider>
  )
}