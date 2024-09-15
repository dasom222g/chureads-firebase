import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  return (
    <div className="relative">
      <h1 className="fixed top-0 left-0 right-0 py-2">
        <Link to="/">
          <img src="./images/logo.svg" className="mx-auto h-16" alt="로고" />
        </Link>
      </h1>
      {/* START: 로그아웃 버튼 */}
      <div className="fixed h-20 top-0 right-6 flex items-center">
        <button
          type="button"
          className="bg-white text-churead-black rounded-lg px-2 py-1"
          onClick={onLogout}
        >
          로그아웃
        </button>
      </div>
      {/* END: 로그아웃 버튼 */}
    </div>
  );
};

export default Header;
