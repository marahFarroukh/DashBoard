import { Outlet } from "react-router-dom";

const Products: React.FC = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  )
};

export default Products;
