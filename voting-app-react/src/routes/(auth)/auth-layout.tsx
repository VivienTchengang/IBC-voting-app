import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Criteria, criterias, Site, sites as dataSites }  from "./../../data/sites";
import { VotingSVG } from "../../components/svg/voting-svg";
import { RankingSVG } from "../../components/svg/ranking-svg";

export type DataContextType = {
  sites: Site[],
  setSites: Dispatch<SetStateAction<Site[]>>,
  criterias: Criteria[],
}

export const DataContext = createContext<DataContextType | null>(null)

export function AuthLayout() {
  const [sites, setSites] = useState(dataSites)
  const navigate = useNavigate()

  const sessionId = localStorage.getItem('item') ;

  useEffect(() => {
    if(!sessionId) {
      navigate('/', { state: { message: 'Login required' } }) ;
    }

  }, [])
  
  return (
    <DataContext.Provider value={{ criterias, sites, setSites }}>
      <main className="h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden">
        {/* content of our application  */}
        <Outlet />
      </main>
      <footer className="h-20 bg-white font-light text-sm rounded-tl-3xl rounded-tr-3xl flex items-center justify-between px-5">
        {/* link to voting section  */}
        <NavLink 
          to={'/voting'}
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
    </DataContext.Provider>
  )
}