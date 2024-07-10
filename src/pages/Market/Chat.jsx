// import React, { useState, useRef, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setSelectedConversation,
//   setSelectedReceiverNickname,
// } from "../../store/chatStore";
// import useListenMessages from "../../hooks/useListenMessages";
// import useGetConversations from "../../hooks/useGetConversations";
// import useGetMessages from "../../hooks/useGetMessages";
// import useSendMessages from "../../hooks/useSendMessages";
// import style from "../../css/Market/Chat.module.css";
// import formatChatTime from "../../utils/formatChatTime";

// const Chat = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);
//   const navigate = useNavigate();

//   const [messageInput, setMessageInput] = useState("");
//   const handleMessageInput = (event) => {
//     setMessageInput(event.target.value);
//   };

//   // 소켓으로 새 메시지 감지
//   useListenMessages();

//   // 왼쪽 채팅창 목록 불러오기
//   const { conversations } = useGetConversations();

//   // 오른쪽 채팅 내역 가져오기
//   const { messages } = useGetMessages();

//   // 채팅 보내기
//   const { sendMessage } = useSendMessages(setMessageInput);

//   // 왼쪽에서 선택한 채팅창(채팅 상대방 id)
//   const selectedConversation = useSelector(
//     (state) => state.chat.selectedConversation
//   );

//   // 현재 채팅방의 상대 닉네임
//   const selectedReceiverNickname = useSelector(
//     (state) => state.chat.selectedReceiverNickname
//   );

//   // 메시지 관련 커스텀 훅에서 사용하기 위해서 redux로 관리
//   const handleChatSelect = (user) => {
//     dispatch(setSelectedConversation(user._id));
//     dispatch(setSelectedReceiverNickname(user.nickname));
//     navigate(`/sale-chat/${user._id}`);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     await sendMessage(messageInput);
//   };

//   useEffect(() => {
//     dispatch(setSelectedConversation(id));
//     if (conversations.length) {
//       const selectedNickname = conversations.find(
//         (conversation) => conversation.participants[0]._id === id
//       ).participants[0].nickname;
//       dispatch(setSelectedReceiverNickname(selectedNickname));
//     }

//     // 다른 채팅방 입장시 자동으로 메시지 입력창에 포커스
//     inputRef.current?.focus();

//     // 다른 채팅방 입장시 입력된 메시지 초기화
//     setMessageInput("");
//   }, [id, conversations]);

//   return (
//     <section className={`mw ${style.chatContainer}`}>
//       {/* 왼쪽에 채팅 목록 */}
//       <div className={style.chatList}>
//         <h2>채팅 목록</h2>
//         <ul>
//           {conversations.map((chat) => {
//             return (
//               <li
//                 key={chat.participants[0]._id}
//                 onClick={() => handleChatSelect(chat.participants[0])}
//                 className={`${
//                   chat.participants[0]._id === id ? style.currentChat : ""
//                 }`}
//               >
//                 {chat.participants[0].nickname}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//       {/* 오른쪽에 선택된 채팅의 대화 */}
//       <div className={style.chatMessages}>
//         {selectedConversation ? (
//           <div>
//             <h2> {selectedReceiverNickname}님과 채팅중입니다.</h2>
//           </div>
//         ) : (
//           <h2>채팅을 선택하세요.</h2>
//         )}

//         {messages.map((message) => {
//           const isReceivedMessage = message.senderId === selectedConversation;

//           return (
//             <div
//               key={message._id}
//               className={
//                 isReceivedMessage ? style.receivedMessage : style.sentMessage
//               }
//             >
//               <p className={style.chatUserName}>
//                 {isReceivedMessage ? selectedReceiverNickname : "나"}
//               </p>
//               {isReceivedMessage ? (
//                 <>
//                   <span className={style.messages}>{message.message}</span>
//                   <span>{formatChatTime(message.createdAt)}</span>
//                 </>
//               ) : (
//                 <>
//                   <span>{formatChatTime(message.createdAt)}</span>
//                   <span className={style.messages}>{message.message}</span>
//                 </>
//               )}
//             </div>
//           );
//         })}

//         <form onSubmit={handleSendMessage}>
//           <input
//             className={style.messageInput}
//             value={messageInput}
//             onChange={handleMessageInput}
//             ref={inputRef}
//             placeholder="메세지를 입력해주세요."
//           />
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Chat;

import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedConversation,
  setSelectedReceiverNickname,
} from "../../store/chatStore";
import useListenMessages from "../../hooks/useListenMessages";
import useGetConversations from "../../hooks/useGetConversations";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessages from "../../hooks/useSendMessages";
import formatChatTime from "../../utils/formatChatTime";
import style from "../../css/Market/Chat.module.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  ConversationList,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    navigate(`/sale-chat/${user._id}`);
  };

  const handleSendMessage = async () => {
    await sendMessage(messageInput);
  };

  useEffect(() => {
    dispatch(setSelectedConversation(id));
    if (conversations.length) {
      const selectedNickname = conversations.find(
        (conversation) => conversation.participants[0]._id === id
      ).participants[0].nickname;
      dispatch(setSelectedReceiverNickname(selectedNickname));
    }

    // 다른 채팅방 입장시 자동으로 메시지 입력창에 포커스
    inputRef.current?.focus();

    // 다른 채팅방 입장시 입력된 메시지 초기화
    setMessageInput("");
  }, [id, conversations]);

  return (
    <section className={`mw ${style.chatContainer}`}>
      <MainContainer>
        <Sidebar position="left">
          <ConversationList>
            {conversations.map((chat) => (
              <Conversation
                key={chat.participants[0]._id}
                name={chat.participants[0].nickname}
                onClick={() => handleChatSelect(chat.participants[0])}
                active={chat.participants[0]._id === id}
              />
            ))}
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <MessageList>
            {messages.map((message) => {
              const isReceivedMessage =
                message.senderId === selectedConversation;
              return (
                <div key={message._id}>
                  <Message
                    className={style.meessageBox}
                    model={{
                      message: message.message,
                      sentTime: formatChatTime(message.createdAt),
                      sender: isReceivedMessage
                        ? selectedReceiverNickname
                        : "나",
                      direction: isReceivedMessage ? "incoming" : "outgoing",
                    }}
                  />
                  <p
                    style={{ textAlign: isReceivedMessage ? "left" : "right" }}
                  >
                    {formatChatTime(message.createdAt)}
                  </p>
                </div>
              );
            })}
          </MessageList>
          <MessageInput
            value={messageInput}
            onChange={setMessageInput}
            placeholder="메세지를 입력해주세요."
            attachButton={false}
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </section>
  );
};

export default Chat;
