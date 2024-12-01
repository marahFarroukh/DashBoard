import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Authorization({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Initialize as null

  const checkToken = () => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  //Loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>; //Show loading while checking
  }

  return <>{isAuthenticated ? children : null}</>;
}

export default Authorization;
