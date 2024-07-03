import React, { useState } from "react";
import style from "../../css/Market/Chat.module.css";

const Chat = () => {
  // 예시로 채팅 목록과 선택된 채팅을 관리할 상태
  const [chatList, setChatList] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  // 채팅을 선택할 때 호출될 함수
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    // 선택된 채팅의 대화를 불러오는 로직을 추가할 수 있음
  };

  return (
    <div className={`mw ${style.chatContainer}`}>
      {/* 왼쪽에 채팅 목록 */}
      <div className={style.chatList}>
        <h2>채팅 목록</h2>
        <ul>
          {chatList.map((chat) => (
            <li key={chat.id} onClick={() => handleChatSelect(chat.id)}>
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
      {/* 오른쪽에 선택된 채팅의 대화 */}
      <div className={style.chatMessages}>
        <h2>채팅창</h2>
        {selectedChat ? (
          <div>
            <p>선택된 ID: {selectedChat}</p>
            {/* 선택된 채팅의 대화 내용을 보여주는 컴포넌트를 추가 */}
          </div>
        ) : (
          <p>채팅을 선택하세요.</p>
        )}
      </div>
    </div>
  );
};
export default Chat;
