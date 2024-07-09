import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useGetConversations = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/messages`,
          {
            credentials: "include",
          }
        );

        const res = await response.json();

        if (!res.result) {
          if (res.message === "로그인이 필요합니다") return navigate("/signin");
          return alert(res.message);
        }

        setConversations(res.filteredChats);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [navigate]);

  return { conversations };
};

export default useGetConversations;
