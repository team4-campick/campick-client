import React, { useState, useEffect } from 'react';
import PostCard from '../../components/MyPage/PostCard';
import style from '../../css/MyPage/MyPost.module.css';
const MyPost = () => {
  // const [postList, setPostList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const postList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const url = 'http://localhost:8000';
  // useEffect(() => {
  //   fetch(`${url}/post/:id`)
  //     .then((res) => res.json)
  //     .then((data) => setPostList(data));
  // }, []);
  console.log(postList);
  return (
    <section>
      <h3 hidden>MyPost</h3>
      <nav className="myPage_SubHeader">내가 쓴 게시글</nav>
      <div className={style.postCon}>
        {postList.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
};

export default MyPost;
