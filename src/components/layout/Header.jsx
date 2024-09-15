import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative">
      <h1 className="fixed top-0 left-0 right-0 py-2">
        <Link to="/">
          <img src="./images/logo.svg" className="mx-auto h-16" alt="로고" />
        </Link>
      </h1>
    </div>
  );
};

export default Header;
