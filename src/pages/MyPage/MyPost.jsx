import React, { useState, useEffect } from "react";
import style from "../../css/MyPage/MyPost.module.css";
import { useSelector } from "react-redux";
import BlogPostCard from "../../components/BlogPost/BlogPostCard";
const MyPost = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userObjId = user?.id;
  const [myPostList, setMyPostList] = useState([]);
  useEffect(() => {
    const getMyPostList = async () => {
      try {
        const response = await fetch(`${url}/post/${userObjId}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        setMyPostList(data.blogPost);
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
        {myPostList.length !== 0 ? (
          myPostList.map((post, i) => <BlogPostCard key={i} post={post} />)
        ) : (
          <div className={style.noPost}>내가 쓴 게시글이 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default MyPost;
