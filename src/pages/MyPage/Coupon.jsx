import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Coupon.module.css";
import CouponCard from "../../components/MyPage/CouponCard";
import { useSelector } from "react-redux";
import { COUPON } from "../../constants/coupon";

const Coupon = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const [coupons, setCoupons] = useState([]);
  // console.log("COUPON", COUPON);
  // const [bingoPattern, setBingoPattern] = useState([]);
  const userObjId = user?.id;
  // const getBingoPattern = async () => {
  //   try {
  //     const response = await fetch(`${url}/bingo-pattern/${userObjId}`, {
  //       method: "GET",
  //       headers: { Accept: "application/json" },
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     setBingoPattern(data.bingoPattern);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const issuanceCoupon = async () => {
  //   try {
  //     await getBingoPattern();
  //     const response = await fetch(`${url}/coupon-issuance`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userObjId,
  //       }),
  //       headers: { Accept: "application/json" },
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     console.log(data);

  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    const getCoupon = async () => {
      try {
        const response = await fetch(`${url}/get-coupon/${userObjId}`, {
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
