import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/chatStore";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    const messageHandler = (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(setMessages([...messages, newMessage]));
    };

    socket?.on("newMessage", messageHandler);

    return () => {
      socket?.off("newMessage", messageHandler);
    };
  }, [dispatch, messages, socket]);
};

export default useListenMessages;
