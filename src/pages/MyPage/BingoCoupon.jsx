import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const BingoCoupon = () => {
  return (
    <section>
      <h3 hidden>BingoCoupon</h3>
      <nav>
        <Link to={'bingo'}>빙고</Link>
        <span>&#47;</span>
        <Link to={'coupon'}>쿠폰함</Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default BingoCoupon;
