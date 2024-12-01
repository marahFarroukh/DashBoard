import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { ThemeContext } from "./NavBar";
import "./SideBar.css";

interface links {
  to: string;
  title: string;
}

function SideBar({
  logo,
  logocon,
  links,
}: {
  logo: string;
  logocon: string;
  links: links[];
}) {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  const logout = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post("https://vica.website/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      localStorage.removeItem("user");
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      setErrorMessage("Logout failed. Please try again."); 
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="left fixed top-0 left-0 flex flex-col h-screen gap-12 max-w-52 w-full p-9 dark:bg-slate-950 shrink-0 text-nowrap bg-white ">
        <h1 className="text-sky-500 text-2xl font-bold">
          {logocon}
          <span className="text-slate-950 dark:text-stone-50">{logo}</span>
        </h1>
        <div className="cont flex flex-col justify-between h-[90%]">
          <div className="flex flex-col gap-6 items-center justify-center">
            {links.map((element, index) => (
              <div key={index} className="link flex flex-col items-start justify-start gap-2 text-lg text-slate-950 dark:text-stone-50 font-medium">
                <NavLink
                  to={element.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {element.title}
                </NavLink>
              </div>
            ))}
          </div>
          <button
            className="bg-sky-500 w-32 p-3 justify-self-end rounded-md text-lg font-bold text-white m-mt-0"
            onClick={() => setShowLogout(true)}
          >
            Log Out
          </button>
          {showLogout && (
            <div className="layout w-screen h-screen">
              <div className="absolute left-1/2 top-0 p-8 bg-white dark:bg-slate-800 flex rounded shadow">
                <div className="flex flex-col gap-6 items-center justify-center">
                  <p className="dark:text-stone-50">Are you sure you want to log out?</p>
                  {errorMessage && <p className="text-red-600">{errorMessage}</p>} {/* عرض رسالة الخطأ */}
                  <div className="modal-buttons flex justify-between gap-10">
                    <button
                      className="p-p-4 w-20 rounded-md bg-slate-100 dark:bg-stone-500 text-slate-950"
                      onClick={() => setShowLogout(false)}
                    >
                      No
                    </button>
                    <button
                      className="p-p-4 w-20 rounded-md bg-red-900 text-white"
                      onClick={logout}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default SideBar;
