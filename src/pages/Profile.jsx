import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Nav from "../components/layout/Nav";

const Profile = () => {
  // logic
  const history = useNavigate();

  const handleLogout = async () => {
    const isLogoutChecked = window.confirm("Are you sure logout?");
    if (isLogoutChecked) {
      await auth.signOut();
      history("/login");
    }
  };

  // view
  return (
    <div>
      {/* START: 로그아웃 버튼 */}
      <div className="fixed h-20 top-0 right-6 flex items-center">
        <button
          type="button"
          className="bg-white text-churead-black rounded-lg px-3 py-1"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
      {/* END: 로그아웃 버튼 */}
      <Nav />
    </div>
  );
};

export default Profile;
