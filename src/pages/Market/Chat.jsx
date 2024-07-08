import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedConversation,
  setSelectedReceiverNickname,
} from "../../store/chatStore";
import useListenMessages from "../../hooks/useListenMessages";
import useGetConversations from "../../hooks/useGetConversations";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessages from "../../hooks/useSendMessages";
import style from "../../css/Market/Chat.module.css";

const Chat = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [messageInput, setMessageInput] = useState("");
  const handleMessageInput = (event) => {
    setMessageInput(event.target.value);
  };

  // 소켓으로 새 메시지 감지
  useListenMessages();

  // 왼쪽 채팅창 목록 불러오기
  const { conversations } = useGetConversations();

  // 오른쪽 채팅 내역 가져오기
  const { messages } = useGetMessages();

  // 채팅 보내기
  const { sendMessage } = useSendMessages(setMessageInput);

  // 왼쪽에서 선택한 채팅창(채팅 상대방 id)
  const selectedConversation = useSelector(
    (state) => state.chat.selectedConversation
  );

  // 현재 채팅방의 상대 닉네임
  const selectedReceiverNickname = useSelector(
    (state) => state.chat.selectedReceiverNickname
  );

  // 메시지 관련 커스텀 훅에서 사용하기 위해서 redux로 관리
  const handleChatSelect = (user) => {
    dispatch(setSelectedConversation(user._id));
    dispatch(setSelectedReceiverNickname(user.nickname));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(messageInput);
  };

  useEffect(() => {
    // 다른 채팅방 입장시 자동으로 메시지 입력창에 포커스
    inputRef.current?.focus();

    // 다른 채팅방 입장시 입력된 메시지 초기화
    setMessageInput("");
  }, [selectedConversation]);

  return (
    <div className={`mw ${style.chatContainer}`}>
      {/* 왼쪽에 채팅 목록 */}
      <div className={style.chatList}>
        <h2>채팅 목록</h2>
        <ul>
          {conversations.map((user) => (
            <li key={user._id} onClick={() => handleChatSelect(user)}>
              {user.nickname}
            </li>
          ))}
        </ul>
      </div>
      {/* 오른쪽에 선택된 채팅의 대화 */}
      <div className={style.chatMessages}>
        <h2>채팅창</h2>
        {selectedConversation ? (
          <div>
            <p>선택된 ID: {selectedConversation}</p>
            {/* 선택된 채팅의 대화 내용을 보여주는 컴포넌트를 추가 */}
          </div>
        ) : (
          <p>채팅을 선택하세요.</p>
        )}

        {messages.map((message) => {
          const isReceivedMessage = message.senderId === selectedConversation;
          return (
            <div
              key={message._id}
              className={
                isReceivedMessage ? style.receivedMessage : style.sentMessage
              }
            >
              <p>{isReceivedMessage ? selectedReceiverNickname : "나"}</p>
              <p>{message.message}</p>
            </div>
          );
        })}

        <form onSubmit={handleSendMessage}>
          <input
            className={style.messageInput}
            value={messageInput}
            onChange={handleMessageInput}
            ref={inputRef}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
