import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostInput from "../components/PostInput";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Edit = ({ item }) => {
  console.log("🚀 ~ Edit ~ item:", item);
  const history = useNavigate("");
  const { id, userName, churead: itemChuread, userPhotoURL } = item;
  // logic
  const user = auth.currentUser; // User || null
  console.log("🚀 ~ Edit ~ user:", user);

  const [isLoading, setIsLoading] = useState(""); // 게시중 로딩

  const [churead, setChuread] = useState(itemChuread);

  const handleSave = async (event) => {
    event.preventDefault();
    const chureadValue = churead.trim();
    // 1. 로그인 한 경우만 실행
    // 2. 입력값 있는경우만 실행
    // 3. 500자 이하인 경우만 실행
    // 4. 포스팅 로딩중이 아닌 경우만 실행(isLoading추가 후에 작성)
    if (isLoading || !user || !chureadValue || chureadValue.length > 500)
      return;
    console.log("chureadValue", chureadValue);

    setIsLoading(true);
    try {
      const docRef = doc(db, "chureads", id);
      await updateDoc(docRef, {
        churead,
        updateAt: Date.now(),
      });
      console.log("수정 완료");
      // 포스팅 완료 후 home화면으로 이동
      history("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hanldeInputChange = (value) => {
    setChuread(value);
  };

  // view
  return (
    <div className="h-full">
      <header className="fixed max-w-[572px] mx-auto px-4 py-6 text-center top-0 left-0 right-0">
        <Link
          to="/"
          className="absolute left-4 text-churead-gray-300 text-opacity-60"
        >
          취소
        </Link>
        <h3 className="font-bold">새로운 스레드</h3>
      </header>
      <main className="h-full pt-[72px] pb-[88px] overflow-hidden">
        <div className="h-full overflow-auto">
          <form id="post" onSubmit={handleSave}>
            {/* START: 사용자 입력 영역 */}
            <PostInput
              defaultValue={churead || ""}
              userName={userName}
              userPhotoURL={userPhotoURL}
              onChange={hanldeInputChange}
            />
            {/* END: 사용자 입력 영역 */}
            {/* START: 게시 버튼 영역 */}
            <div className="w-full max-w-[572px] flex items-center fixed bottom-0 lef p-6">
              <p className="text-churead-gray-300 text-opacity-60">
                누구에게나 답글 및 인용 허용
              </p>
              <button
                type="submit"
                className="ml-auto px-5 py-2 bg-white text-churead-black rounded-3xl font-bold"
              >
                {isLoading ? "Loading" : "수정"}
              </button>
            </div>
            {/* END: 게시 버튼 영역 */}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Edit;
