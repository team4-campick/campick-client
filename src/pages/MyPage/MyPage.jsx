import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../../css/MyPage/MyPage.module.css";
import "../../css/MyPage/MyPageCommon.css";

const MyPage = () => {
  const user = useSelector((state) => state.user.user);
  const nickname = user?.nickname;
  return (
    <section className={style.myPage}>
      <h2 hidden>MyPage</h2>
      <div className={style.banner}>
        <p className={style.myPageIntro}>{`${nickname}님 반가워요 !`}</p>
      </div>
      <div className={style.contentCon}>
        <aside className={style.sideBar}>
          <Link to="/my-page/bingo-coupon/bingo">빙고 &#47; 쿠폰함</Link>
          <Link to="/my-page/transaction-history/sale">거래 내역</Link>
          <Link to="/my-page/my-post">내가 쓴 게시글</Link>
          <Link to="/my-page/edit-info">회원정보 수정</Link>
          <Link to="/my-page/customer-service">고객 지원</Link>
        </aside>
        <div className={style.outletArea}>
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
};
export default MyPage;
