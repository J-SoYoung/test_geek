import React from "react";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "../../assets/icons/nav_home.svg";
import HomeActIcons from "../../assets/icons/nav_homeActive.svg";
import ItemsIcon from "../../assets/icons/nav_items.svg";
import WishIcon from "../../assets/icons/nav_wish.svg";
import UsedIcon from "../../assets/icons/nav_used.svg";
import UsedActIcon from "../../assets/icons/nav_usedActive.svg";
import MyIcon from "../../assets/icons/nav_my.svg";
import MyActIcon from "../../assets/icons/nav_myActive.svg";

const BottomNav = () => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 mx-auto w-full max-w-[598px] border-t-2 bg-[#fff]">
      <ul className="flex justify-around p-4">
        <Link to="/" className="text-center cursor-pointer">
          <img
            src={location.pathname === "/" ? HomeActIcons : HomeIcon}
            alt="Home"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">홈</span>
        </Link>
        {/* <Link to="/" className="text-center cursor-pointer">
          {location.pathname === "/" ? (
            <>
              <img src={HomeActIcons} alt="Home" className="w-6 h-6 mx-auto" />
              <span className="text-xs">홈</span>
            </>
          ) : (
            <>
              <img src={HomeIcon} alt="Home" className="w-6 h-6 mx-auto" />
              <span className="text-xs">홈</span>
            </>
          )} 
        </Link> */}

        <li className="text-center cursor-pointer">
          <img src={ItemsIcon} alt="Home" className="w-6 h-6 mx-auto" />
          <span className="text-xs">상품</span>
        </li>
        <li className="text-center cursor-pointer">
          <img src={WishIcon} alt="Home" className="w-6 h-6 mx-auto" />
          <span className="text-xs">관심목록</span>
        </li>
        <Link to="/usedHome" className="text-center cursor-pointer">
          <img
            src={location.pathname === "/usedHome" ? UsedActIcon : UsedIcon}
            alt="Home"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">중고거래</span>
        </Link>
        {/* {location.pathname === "/usedHome" ? (
          <>
            <img src={UsedActIcon} alt="Home" className="w-6 h-6 mx-auto" />
            <span className="text-xs">중고거래</span>
          </>
        ) : (
          <>
            <img src={UsedIcon} alt="Home" className="w-6 h-6 mx-auto" />
            <span className="text-xs">중고거래</span>
          </>
        )} */}
        <Link to="/my" className="text-center cursor-pointer">
          <img
            src={location.pathname === "/my" ? MyActIcon : MyIcon}
            alt="Home"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">마이</span>
        </Link>
        {/* <Link to="/my" className="text-center cursor-pointer">
          {location.pathname === "/my" ? (
            <>
              <img src={MyActIcon} alt="Home" className="w-6 h-6 mx-auto" />
              <span className="text-xs">마이</span>
            </>
          ) : (
            <>
              <img src={MyIcon} alt="Home" className="w-6 h-6 mx-auto" />
              <span className="text-xs">마이</span>
            </>
          )}
        </Link> */}
      </ul>
    </nav>
  );
};

export default BottomNav;
