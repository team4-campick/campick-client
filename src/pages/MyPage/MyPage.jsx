import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "../../css/MyPage/MyPage.module.css";
import "../../css/MyPage/MyPageCommon.css";
const MyPage = () => {
  const test = "abcd";
  const [nickname, setNickname] = useState("홍길동");
  // const {userId} = useParams();
  const userId = "deleteMe";
  // const getUser = async () => {
  //   const response = await fetch('http://localhost:8000/get-user', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       nickname: test,
  //     }),
  //     credentials: 'include',
  //   });
  //   if (response.status === 500) {
  //     console.log('로그인 실패');
  //   } else if (response.status === 200) {
  //     const data = await response.json();
  //     setNickname(data.nickname);
  //   }
  // };

  useEffect(() => {
    // fetch(`http://localhost:8000/get-user/${userId}`)
    //   .then((res) => res.json())
    //   .then(({ userDoc }) => setNickname(userDoc.nickname));
  }, [nickname]);
  return (
    <section className={style.myPage}>
      <h2 hidden>MyPage</h2>
      <div className={style.banner}>
        <p className={style.myPageIntro}>{`안녕하세요, ${nickname} 님!`}</p>
      </div>
      <aside className={style.sideBar}>
        <Link to='/my-page/bingo-coupon/bingo'>빙고 &#47; 쿠폰함</Link>
        <Link to='/my-page/transaction-history/sale'>거래 내역</Link>
        <Link to='/my-page/my-post'>내가 쓴 게시글</Link>
        <Link to='/my-page/edit-info'>회원정보 수정</Link>
        <Link to='/my-page/customer-service'>고객 지원</Link>
        <Link to={`/my-page/customer-service/${userId}`}>고객지원2</Link>
      </aside>
      <Outlet></Outlet>
    </section>
  );
};

export default MyPage;
