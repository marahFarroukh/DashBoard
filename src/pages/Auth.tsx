import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="flex justify-center items-center bg-[url('/assets/img/auth-bg.png')] h-screen">
      <Outlet />
    </div>
  );
}

export default Auth;
