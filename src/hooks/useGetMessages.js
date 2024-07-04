import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/chatStore";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state) => state.chat.selectedConversation
  );
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/messages/${selectedConversation}`,
          {
            credentials: "include",
          }
        );

        const res = await response.json();

        if (!res.result) return alert(res.message);

        dispatch(setMessages(res.messages));
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedConversation) getMessages();
  }, [dispatch, selectedConversation]);

  return { messages };
};

export default useGetMessages;
