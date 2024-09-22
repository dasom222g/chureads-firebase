import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

const Home = ({ onEdit }) => {
  // logic
  const history = useNavigate();
  const user = auth.currentUser;

  let unsubscribe = null;

  const [feedList, setFeedList] = useState([]);

  const handleLogout = async () => {
    const isLogoutChecked = window.confirm("Are you sure logout?");
    if (isLogoutChecked) {
      await auth.signOut();
      history("/login");
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getData = async () => {
    // query 객체 정의
    const collectionRef = collection(db, "chureads");
    // const chureadQuery = query(collectionRef);

    // 최신데이터를 위로 오게하고 싶다면?
    const chureadQuery = query(collectionRef, orderBy("createAt", "desc"));

    // document데이터 가져오기
    const snapshot = await getDocs(chureadQuery);
    const datas = snapshot.docs.map((item) => ({
      id: item.id, // 자동 생성되는 documentID의미
      ...item.data(),
    }));
    console.log("🚀 ~ datas:", datas);
    setFeedList(datas);
  };

  const getLiveData = async () => {
    // query 객체 정의
    const collectionRef = collection(db, "chureads");
    // const chureadQuery = query(collectionRef);

    // 최신데이터를 위로 오게하고 싶다면?
    const chureadQuery = query(collectionRef, orderBy("createAt", "desc"));

    // 실시간 데이터 구독 취소를 위해 변수에 리턴값 저장
    unsubscribe = onSnapshot(chureadQuery, (snapshot) => {
      const datas = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      console.log("🚀 Snapshot ~ datas:", datas);
      setFeedList(datas);
    });
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (selectedItem) => {
    // 글 작성자 한번 더 체크
    if (user.uid !== selectedItem.userId) return;
    onEdit(selectedItem);
    history("/edit");
  };

  const handleLike = async (selectedItem) => {
    const { id } = selectedItem;
    const docRef = doc(db, "chureads", id);
    await updateDoc(docRef, {
      likes: increment(1), // 1 증가
      // likes: increment(-1), // 1 증가
    });
  };

  const handleDelete = async (selectedItem) => {
    // ok안한 경우 취소
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    // 작성 유저가 아니면 취소
    const { userId, id } = selectedItem;

    if (userId !== user.uid) return;
    const docRef = doc(db, "chureads", id);

    try {
      // 문서(아이템)) 삭제
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getData();
    getLiveData(); // 실시간 데이터로 무한 반복되니까 진입시 한번만 실행시키기

    return () => {
      // 실시간 데이터 snapshot이벤트/ 구독취소
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <FeedItem
                item={item}
                currentUserId={user.uid}
                key={item.id}
                onEdit={handleEdit}
                onLike={handleLike}
                onDelete={handleDelete}
              />
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
