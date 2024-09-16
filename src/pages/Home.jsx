import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const Home = () => {
  // logic
  const history = useNavigate();

  const [feedList, setFeedList] = useState([]);

  const handleLogout = async () => {
    const isLogoutChecked = window.confirm("Are you sure logout?");
    if (isLogoutChecked) {
      await auth.signOut();
      history("/login");
    }
  };

  const getData = async () => {
    // query 객체 정의
    const chureadQuery = query(collection(db, "chureads"));

    // document데이터 가져오기
    const snapshot = await getDocs(chureadQuery);
    const datas = snapshot.docs.map((item) => ({
      id: item.id, // 자동 생성되는 documentID의미
      ...item.data(),
    }));
    setFeedList(datas);
  };

  useEffect(() => {
    getData();
  }, []);

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
            {feedList.map((item) => (
              <FeedItem item={item} key={item.id} />
            ))}
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
