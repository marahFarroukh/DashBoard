import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { SearchContext } from "../components/NavBar";
import { useState } from "react";

function DashBoard() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleProductSearch = (query: string | Array<string>) => {
    console.log("Searching for:", query);
    setSearchQuery(query as string)
  };

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className="dashboard bg-slate-100 dark:bg-slate-900 flex max-w-[100vw] w-full h-screen">
        <SideBar
          logo="Stack"
          logocon="Dash"
          links={[
            { to: "", title: "Products" },
            { to: "favorites", title: "Favorites" },
            { to: "otherlist", title: "Other List" },
          ]}
        />
        <div className="child w-full max-w-[calc(100vw_-_208px)] ml-[208px]">
          <NavBar onSearch={handleProductSearch} />
          <div className="outlet w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default DashBoard;
