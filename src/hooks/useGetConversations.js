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
          // TODO: 프론트에서 로그인이 필요한 페이지 또는 API를 어떻게 사전에 체크할 것인지(쿠키?)
          if (res.message === "로그인이 필요합니다") return navigate("/signin");
          return alert(res.message);
        }

        setConversations(res.filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [navigate]);

  return { conversations };
};

export default useGetConversations;
