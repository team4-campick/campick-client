import React, { useState, useEffect } from "react";
import PostCard from "../../components/MyPage/PostCard";
import style from "../../css/MyPage/MyPost.module.css";
const MyPost = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const [myPostList, setMyPostList] = useState([1, 2, 3, 4, 5, 6]);
  const getMyPostList = async () => {
    try {
      const response = await fetch(`${url}/post/:id`);
      const data = await response.json();
      if (!data) {
        alert("값이 없넹");
      }
      setMyPostList(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyPostList();
  }, []);
  console.log(myPostList);
  return (
    <section>
      <h3 hidden>MyPost</h3>
      <nav className="myPage_SubHeader">내가 쓴 게시글</nav>
      <div className={style.postCon}>
        {myPostList.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
};

export default MyPost;
