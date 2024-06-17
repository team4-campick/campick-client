import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  return (
    <section>
      <h2 hidden>MyPage</h2>
      <div>
        <p>안녕하세요, 000 님!</p>
        <img src="/" alt="마이페이지 배너영역" />
      </div>
      <div></div>
      <aside>
        <Link to="/my-page/bingo-coupon">빙고 / 쿠폰함</Link>
        <Link to="/my-page/transaction-history">거래 내역</Link>
        <Link to="/my-page/my-post">내가 쓴 게시글</Link>
        <Link to="/my-page/edit-info">회원정보 수정</Link>
        <Link to="/my-page/customer-service">고객 지원</Link>
      </aside>
    </section>
  );
};

export default MyPage;
