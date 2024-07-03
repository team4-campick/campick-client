import React, { useState, useEffect } from "react";
import PostCard from "../../components/MyPage/PostCard";
import style from "../../css/MyPage/MyPost.module.css";
import { useSelector } from "react-redux";
import BlogPostCard from "../../components/BlogPost/BlogPostCard";
const MyPost = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;
  const [myPostList, setMyPostList] = useState([1, 2, 3, 4, 5, 6]);
  useEffect(() => {
    const getMyPostList = async () => {
      try {
        const response = await fetch(`${url}/post/${userName}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // headers: {
          //   // Authorization: localStorage.getItem("token"),
          // },
          credentials: "include",
        });
        const data = await response.json();
        if (!data) {
          alert("값이 없넹");
        }
        console.log("post get data", data);
        setMyPostList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMyPostList();
  }, []);
  console.log(myPostList);
  return (
    <section>
      <h3 hidden>MyPost</h3>
      <nav className="myPage_SubHeader">내가 쓴 게시글</nav>
      <div className={style.postCon}>
        {myPostList.map((post, i) => (
          <BlogPostCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
};

export default MyPost;
