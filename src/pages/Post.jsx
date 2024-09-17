import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostInput from "../components/PostInput";
import { auth } from "../firebase";

const Post = () => {
  // logic
  const user = auth.currentUser; // User || null

  const [churead, setChuread] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user || !churead) return;
    console.log("churead", churead);
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
          <form id="post" onSubmit={handleSubmit}>
            {/* START: 사용자 입력 영역 */}
            <PostInput onChange={hanldeInputChange} />
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
                게시
              </button>
            </div>
            {/* END: 게시 버튼 영역 */}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Post;
