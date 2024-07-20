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
        console.log("data coupon list", data.couponList);
        setCoupons(data.couponList);
      } catch (error) {
        console.log(error);
      }
    };
    getCoupon();
  }, [userObjId]);
  return (
    <section className={style.coupon}>
      <h3 hidden>Coupon</h3>
      <div className={style.couponCon}>
        {coupons.map((coupon, i) =>
          coupon.status === "active" ? (
            <CouponCard key={i} coupon={coupon} />
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
            <CouponCard key={i} coupon={coupon} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default Coupon;
