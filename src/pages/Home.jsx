import React from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
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
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header onLogout={handleLogout} />
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        <div>
          {/* START: 피드 영역 */}
          <ul>
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
          </ul>
          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
