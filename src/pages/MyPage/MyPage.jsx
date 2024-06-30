import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "../../css/MyPage/MyPage.module.css";
import "../../css/MyPage/MyPageCommon.css";
import { useSelector } from "react-redux";

const url = process.env.REACT_APP_SERVER_URL;
const MyPage = () => {
  const [nickName, setNickName] = useState("");
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;
  const getNickname = async () => {
    const response = await fetch(`${url}/get-user/${userName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    setNickName(data.userDoc?.nickname);
  };
  useEffect(() => {
    getNickname();
  }, []);
  return (
    <section className={style.myPage}>
      <h2 hidden>MyPage</h2>
      <div className={style.banner}>
        <p className={style.myPageIntro}>{`안녕하세요, ${nickName} 님!`}</p>
      </div>
      <aside className={style.sideBar}>
        <Link to="/my-page/bingo-coupon/bingo">빙고 &#47; 쿠폰함</Link>
        <Link to="/my-page/transaction-history/sale">거래 내역</Link>
        <Link to="/my-page/my-post">내가 쓴 게시글</Link>
        <Link to="/my-page/edit-info">회원정보 수정</Link>
        <Link to="/my-page/customer-service">고객 지원</Link>
      </aside>
      <Outlet></Outlet>
    </section>
  );
};

export default MyPage;
