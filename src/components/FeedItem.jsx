import React from "react";
import { FaTrash } from "react-icons/fa";
import { RiHeartLine, RiPencilFill } from "react-icons/ri";

const FeedItem = ({ item, currentUserId, onEdit, onLike, onDelete }) => {
  // logic
  const { userId, userName, churead, likes } = item;

  // 현재 로그인한 유저가 글 작성자인지 체크하여 권한 부여
  const isAuthor = currentUserId === userId;

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
            {isAuthor && (
              <div className="ml-auto flex gap-1">
                <button
                  type="button"
                  className="max-w-6 p-1"
                  onClick={() => onEdit(item)}
                >
                  <RiPencilFill size={"18px"} />
                </button>
                <button
                  type="button"
                  className="max-w-6 p-1"
                  onClick={() => onDelete(item)}
                >
                  <FaTrash size={"14px"} />
                </button>
              </div>
            )}
            {/* END: 수정, 삭제 버튼 영역 */}
          </div>
          <p className="pt-1">{churead}</p>
          {/* START: 좋아요 영역 */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="text-churead-gray-400"
              onClick={() => onLike(item)}
            >
              <RiHeartLine />
            </button>
            <span>{likes}</span>
          </div>
          {/* END: 좋아요 영역 */}
        </div>
        {/* END: 콘텐츠 영역 */}
      </div>
    </li>
  );
};

export default FeedItem;
