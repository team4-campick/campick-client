import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from '../../css/MyPage/MyPage.module.css';
import '../../css/MyPage/MyPageCommon.css';
const MyPage = () => {
  const [nickname, setNickname] = useState('홍길동');

  return (
    <section className={style.MyPage}>
      <h2 hidden>MyPage</h2>
      <div className={style.Banner}>
        <p className={style.MyPageIntro}>{`안녕하세요, ${nickname} 님!`}</p>
      </div>
      <aside className={style.SideBar}>
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
