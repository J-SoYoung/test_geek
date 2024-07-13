import React from "react";
import Chevron_left from "../../assets/icons/chevron_left.svg";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="w-[600px] h-[100%]">
      <header className="p-8 text-left ">
        {location.pathname === "/my" ? (
          <Link to="/">
            <img
              src={Chevron_left}
              alt="이전 페이지로"
              className="w-10 h-10 cursor-pointer "
            />
          </Link>
        ) : (
          <Link to="/my">
            <img
              src={Chevron_left}
              alt="이전 페이지로"
              className="w-10 h-10 cursor-pointer "
            />
          </Link>
        )}
        <h1 className="text-3xl font-bold text-center mb-5 mt-5">{title}</h1>
      </header>

      {/* Contents */}
      <main >{children}</main>
    </div>
  );
};
export default Layout;
