import React, { useEffect, useState } from "react";
import style from "./CouponCard.module.css";

const CouponCard = ({ coupon }) => {
  const [newDate, setNewDate] = useState("");
  const getDateNdays = async (nowDate, date) => {
    const expirationDate = new Date(nowDate);
    expirationDate.setDate(expirationDate.getDate() + date);
    setNewDate(expirationDate);
  };
  useEffect(() => {
    getDateNdays(Date(coupon.activeDate), coupon.date);
  }, []);
  console.log(newDate);
  return (
    <div className={style.couponCard}>
      <div className={style.statusCircle}>test</div>
      <span className={style.issuanceCondition}>{coupon.condition}</span>
      <p className={style.couponType}>{coupon.type}</p>
      <span>상품 및 패키지 예약시 사용 가능한 할인 쿠폰</span>
      <div className={style.couponInfo}>
        <span>24.08.30 까지 사용가능</span>
        <span className={style.caution}>
          5만원 이상 구매 시 사용할 수 있습니다.
        </span>
      </div>
      <u className={style.couponNum}>쿠폰 번호 확인</u>
      <span>{coupon.serialNum}</span>
    </div>
  );
};
export default CouponCard;
