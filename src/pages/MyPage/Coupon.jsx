import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Coupon.module.css";
import CouponCard from "../../components/MyPage/CouponCard";
import { useSelector } from "react-redux";

const Coupon = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const [coupons, setCoupons] = useState([]);
  const userObjId = user?.id;

  useEffect(() => {
    const getCoupon = async () => {
      try {
        const response = await fetch(`${url}/coupon/${userObjId}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        setCoupons(data.couponList);
      } catch (error) {
        console.error(error);
      }
    };
    if (userObjId) {
      getCoupon();
    }
  }, [userObjId, setCoupons]); // 상태가 변경되면 useEffect 재실행

  const updateCoupons = (updatedCoupon) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon._id === updatedCoupon._id ? updatedCoupon : coupon
      )
    );
  };

  return (
    <section className={style.coupon}>
      <h3 hidden>Coupon</h3>
      <div className={style.couponCon}>
        {coupons.map((coupon, i) =>
          coupon.status === "active" ? (
            <CouponCard key={i} coupon={coupon} updateCoupons={updateCoupons} />
          ) : null
        )}
      </div>
      <div className="testArea">
        <span>사용한 쿠폰</span>
        <span className="divider"></span>
      </div>
      <div className={style.notAvailableCouponCon}>
        {coupons.map((coupon, i) =>
          coupon.status === "expired" ? (
            <CouponCard key={i} coupon={coupon} updateCoupons={updateCoupons} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default Coupon;
