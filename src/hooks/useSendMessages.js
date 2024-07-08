import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/chatStore";

const useSendMessages = (setMessageInput) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.chat.selectedConversation
  );
  const messages = useSelector((state) => state.chat.messages);

  const sendMessage = async (message) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/messages/send/${selectedConversation}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
          credentials: "include",
        }
      );

      const res = await response.json();

      if (!res.result) return alert(res.message);

      dispatch(setMessages([...messages, res.newMessage]));
      setMessageInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return { sendMessage };
};

export default useSendMessages;
