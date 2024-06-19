import React, { useState, useEffect } from 'react';

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
      <div className="postCon">
        {postList.map((post, i) => (
          <article key={i}>
            <h3>{post}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MyPost;
