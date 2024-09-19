import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiEditBoxFill,
  RiEditBoxLine,
  RiHome5Fill,
  RiHome5Line,
} from "react-icons/ri";
import { FaRegUser, FaUser } from "react-icons/fa";

const Nav = () => {
  // logic
  const location = useLocation();

  const navList = [
    {
      id: 1,
      pathname: "/",
      icon: <RiHome5Line size={"28px"} />,
      activeIcon: <RiHome5Fill size={"28px"} />,
    },
    {
      id: 2,
      pathname: "/post",
      icon: <RiEditBoxLine size={"28px"} />,
      activeIcon: <RiEditBoxFill size={"28px"} />,
    },
    {
      id: 3,
      pathname: "/profile",
      icon: <FaRegUser size={"24px"} />,
      activeIcon: <FaUser size={"24px"} />,
    },
  ];

  // view
  return (
    <nav className="fixed bottom-0 bg-churead-gray-800 w-full max-w-[572px]">
      <ul className="flex justify-center">
        {navList.map((nav) => (
          <li key={nav.id}>
            <Link to={nav.pathname} className="block p-6">
              {location.pathname === nav.pathname ? nav.activeIcon : nav.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
