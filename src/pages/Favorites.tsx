import { useContext } from "react";
import { ThemeContext } from "../components/NavBar";

export default function Favorites() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div className="side flex  ">
          <div
            className={`right h-[calc(100vh_-_80px)] w-full p-5 bg-slate-100 dark:bg-slate-900  `}
          >
            <div className="top flex items-center justify-between">
              <h1
                className={`text-slate-950 text-2xl font-bold p-py-11 dark:text-slate-50  `}
              >
                Favorites
              </h1>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
