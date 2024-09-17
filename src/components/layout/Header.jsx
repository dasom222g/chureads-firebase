import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  return (
    <header className="max-w-[572px] fixed top-0 left-0 right-0 mx-auto">
      <h1 className="py-2 text-center">
        <Link to="/" className="w-fit inline-block">
          <img src="./images/logo.svg" className="mx-auto h-16" alt="로고" />
        </Link>
      </h1>
      {/* START: 로그아웃 버튼 */}
      <div className="flex items-center absolute right-5 top-1/2 transform -translate-y-1/2">
        <button
          type="button"
          className="bg-white text-churead-black rounded-lg px-2 py-1"
          onClick={onLogout}
        >
          로그아웃
        </button>
      </div>
      {/* END: 로그아웃 버튼 */}
    </header>
  );
};

export default Header;
