import { useEffect, useState, createContext, useContext } from "react";

export const SearchContext = createContext<string>("");
export const ThemeContext = createContext<string>("");
export const TurnOnContext = createContext<boolean>(false);

interface NavBarProps {
  onSearch: (query: string | string[]) => void;
}

function NavBar({ onSearch }: NavBarProps) {
  const theme = useContext(ThemeContext);
  const search = useContext(SearchContext);
  const turn = useContext(TurnOnContext);

  const [themeState, setThemeState] = useState<string>(theme);
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const [change, setChange] = useState<boolean>(turn);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstname = user?.first_name;
  const lastname = user?.last_name;
  const username = user?.user_name;
  const profile = user?.profile_image_url;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeState === "dark");
  }, [themeState]);

  // Toggle between light and dark mode
  const handleSwitchMode = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Handle search query changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChange(!change)
    const query: string = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="top h-20 px-9 flex justify-between items-center bg-white dark:bg-slate-950">
      <input
        type="text"
        placeholder="Search a Product ..."
        id="search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="max-w-96 rounded-full w-full bg-slate-100 p-2 dark:bg-slate-700 dark:text-slate-50"
      />

      <div className="right flex gap-4 items-center">
        <div className="userdata flex justify-center items-center gap-4">
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${profile})`,
              backgroundSize: "cover",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
            }}
          ></div>
          <div>
            <p className="dark:text-stone-50 text-slate-950">
              {firstname} {lastname}
            </p>
            <p className="dark:text-stone-50">{username}</p>
          </div>
        </div>
        <button
          id="btn"
          onClick={handleSwitchMode}
          type="button"
          className="px-4 border-l-4 dark:border-current"
        >
          {themeState === "dark" ? (
            <i className="fa-solid fa-sun bg-white"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
