import React from "react";
import { Link, Outlet } from "react-router-dom";

const BingoCoupon = () => {
  return (
    <section>
      <h3 hidden>BingoCoupon</h3>
      <nav className="myPage_SubHeader">
        <Link to="bingo">빙고</Link>
        <span>&nbsp;&#47;&nbsp;</span>
        <Link to="coupon">쿠폰함</Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default BingoCoupon;
