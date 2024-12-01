import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkToken = () => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      // Navigate to the products page after successful authentication
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);
}

export default App;
