import {
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { SearchContext } from "../components/SearchContext";
export const ThemeContext = createContext<string>("");
export const TurnOnContext = createContext<boolean>(false);

function NavBar() {
  const theme = useContext(ThemeContext);
  const [themeState, setThemeState] = useState(theme);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstname = user?.first_name;
  const lastname = user?.last_name;
  const username = user?.user_name;
  const profile = user?.profile_image_url;
  const { handleProductSearch } = useContext(SearchContext);
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    handleProductSearch(query);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeState === "dark");
  }, [themeState]);

  const handleSwitchMode = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="top h-20 px-9 flex justify-between items-center bg-white dark:bg-slate-950">
      <div className="flex items-center relative max-w-96 w-full">
        <input
          type="text"
          placeholder="Search a Product ..."
          id="search"
          value={query}
          onChange={handleInputChange}
          className="rounded-full w-full bg-slate-100 p-2 dark:bg-slate-700 dark:text-slate-50"
        />
        <button onClick={handleSearch}>search</button>
      </div>

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
