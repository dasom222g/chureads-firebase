import React from "react";

const FeedItem = ({ item }) => {
  // logic
  const { userName, churead, likes } = item;

  // view
  return (
    <li className="border-t border-churead-gray-300 border-opacity-15 px-6 py-3">
      <div className="flex items-start gap-3">
        {/* START: 프로필 이미지 영역 */}
        <div className="w-10 rounded-full overflow-hidden mt-1">
          <img src="./images/temp/user.png" alt="사용자 프로필 이미지" />
        </div>
        {/* END: 프로필 이미지 영역 */}
        {/* START: 콘텐츠 영역 */}
        <div className="w-full">
          <div className="flex items-center">
            <span className="font-bold">{userName}</span>
            {/* START: 수정, 삭제 버튼 영역 */}
            <div className="ml-auto">
              <button type="button" className="max-w-6 p-1">
                <img src="./images/icon-home.svg" alt="" />
              </button>
              <button type="button" className="max-w-6 p-1">
                <img src="./images/icon-home.svg" alt="" />
              </button>
            </div>
            {/* END: 수정, 삭제 버튼 영역 */}
          </div>
          <p className="pt-1">{churead}</p>
          {/* START: 좋아요 영역 */}
          <div className="flex items-center">
            <button type="button" className="text-churead-gray-400">
              좋아요 아이콘 <span>{likes}</span>
            </button>
          </div>
          {/* END: 좋아요 영역 */}
        </div>
        {/* END: 콘텐츠 영역 */}
      </div>
    </li>
  );
};

export default FeedItem;
