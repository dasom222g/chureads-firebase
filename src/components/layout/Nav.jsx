import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  // logic

  // view
  return (
    <nav className="fixed bottom-0 bg-churead-gray-800 w-full max-w-[572px]">
      <ul className="flex justify-center">
        <li>
          <Link to="/" className="block p-6">
            <img src="./images/icon-home.svg" alt="Home으로 가기" />
          </Link>
        </li>
        <li>
          <Link to="/post" className="block p-6">
            <img src="./images/icon-home.svg" alt="Home으로 가기" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="block p-6">
            <img src="./images/icon-home.svg" alt="Home으로 가기" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
