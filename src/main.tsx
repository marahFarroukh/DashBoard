import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import Products from "./pages/Products.tsx";
import Favorites from "./pages/Favorites.tsx";
import OtherList from "./pages/OtherList.tsx";
import ProductsRead from "./pages/ProductsRead.tsx";
import ProductsUpdate from "./pages/ProductsUpdate.tsx";
import ProductsCreate from "./pages/ProductsCreate.tsx";
import ProductsShow from "./pages/ProductsShow.tsx";
import "./output.css";
import Authorization from "./components/Authorization.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",

    element: (
      <Authorization>
        <DashBoard />
      </Authorization>
    ),
    children: [
      {
        path: "",
        element: (
          <Authorization>
            <Products />
          </Authorization>
        ),
        children: [
          {
            path: "",
            element: (
              <Authorization>
                <ProductsRead />,
              </Authorization>
            ),
          },
          {
            path: "update/:id",
            element: <ProductsUpdate />,
          },
          {
            path: "create",
            element: <ProductsCreate />,
          },
          {
            path: "show/:id",
            element: <ProductsShow />,
          },
        ],
      },
      {
        path: "favorites",
        element: (
          <Authorization>
            <Favorites />
          </Authorization>
        ),
      },
      {
        path: "otherlist",
        element: (
          <Authorization>
            <OtherList />
          </Authorization>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
