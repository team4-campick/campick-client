import React from 'react';
import style from '../../css/MyPage/Coupon.module.css';
import CouponCard from '../../components/MyPage/CouponCard';

const Coupon = () => {
  const couponList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const notAvailableList = ['expired', 'expired', 'expired', 'expired'];
  return (
    <section className={style.coupon}>
      <h3 hidden>Coupon</h3>
      <div className={style.couponCon}>
        {couponList.map((coupon, i) => (
          <CouponCard key={i} coupon={coupon} />
        ))}
      </div>
      <div className="testArea">
        <span>사용한 쿠폰</span>
        <span className="divider"></span>
      </div>
      <div className={style.notAvailableCouponCon}>
        {notAvailableList.map((coupon, i) => (
          <CouponCard key={i} coupon={coupon} />
        ))}
      </div>
    </section>
  );
};

export default Coupon;
