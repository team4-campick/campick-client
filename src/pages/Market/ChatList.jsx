import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedConversation } from "../../store/chatStore";
import useListenMessages from "../../hooks/useListenMessages";
import useGetConversations from "../../hooks/useGetConversations";
import style from "../../css/Market/Chat.module.css";

const ChatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 소켓으로 새 메시지 감지
  useListenMessages();

  // 왼쪽 채팅창 목록 불러오기
  const { conversations } = useGetConversations();

  // 메시지 관련 커스텀 훅에서 사용하기 위해서 redux로 관리
  const handleChatSelect = (user) => {
    navigate(`/sale-chat/${user._id}`);
  };

  useEffect(() => {
    dispatch(setSelectedConversation(null));
  }, []);

  return (
    <div className={`mw ${style.chatContainer}`}>
      {/* 왼쪽에 채팅 목록 */}
      <div className={style.chatList}>
        <h2>채팅 목록</h2>
        <ul>
          {conversations.map((chat) => {
            return (
              <li
                key={chat.participants[0]._id}
                onClick={() => handleChatSelect(chat.participants[0])}
              >
                {chat.participants[0].nickname}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 오른쪽에 선택된 채팅의 대화 */}
      <div className={style.chatMessages}>
        <p>채팅을 선택하세요.</p>
      </div>
    </div>
  );
};

export default ChatList;
