import React, { useState } from "react";
import style from "./CouponCard.module.css";
import { COUPON_MSG } from "../../constants/couponMsg";
import { RxCross2 } from "react-icons/rx";

const CouponCard = ({ coupon, updateCoupons }) => {
  const url = process.env.REACT_APP_SERVER_URL;
  const [serialOn, setSerialOn] = useState(false);
  const couponNumber = coupon.serialNum ? coupon.serialNum : "123456789012";

  const showSerialNum = () => {
    setSerialOn(true);
    revealCouponNumber(couponNumber);
  };

  const getRandomDigits = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  const [displayText, setDisplayText] = useState(
    getRandomDigits(couponNumber.length)
  );

  const revealCouponNumber = (number) => {
    const duration = 100;
    let revealedText = "";

    for (let i = 0; i < number.length; i++) {
      setTimeout(() => {
        revealedText += number[i];
        setDisplayText(
          revealedText + getRandomDigits(number.length - revealedText.length)
        );
      }, i * duration);
    }
  };

  const handleCouponDel = async () => {
    try {
      const response = await fetch(`${url}/coupon/${coupon._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status === 204) {
        alert(COUPON_MSG.DELETE);
        updateCoupons({ ...coupon, status: "deleted" }); // 상태 업데이트
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCouponUsed = async () => {
    try {
      const response = await fetch(`${url}/coupon/${coupon._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        alert(COUPON_MSG.USED);
        updateCoupons({ ...coupon, status: "expired" }); // 상태 업데이트
      }
    } catch (error) {
      console.error(error);
    }
  };

  const timeGap = new Date(coupon.expireDate).getTime() - new Date().getTime();
  const dDay = Math.floor(timeGap / (1000 * 60 * 60 * 24));

  return (
    <div className={style.couponCard}>
      {dDay > 0 ? (
        <div className={style.statusCircle}>D-{dDay}</div>
      ) : (
        <div className={style.statusExpiredCircle}>
          <RxCross2 />
        </div>
      )}

      <span className={style.issuanceCondition}>{coupon.condition}</span>
      <p className={style.couponType}>{coupon.type}</p>
      <span>상품 및 패키지 예약시 사용 가능한 할인 쿠폰</span>
      <div className={style.couponInfo}>
        <span>
          {coupon.expireDate.slice(2, 10).split("-").join(".")} 까지 사용가능
        </span>
        <span className={style.caution}>
          캠픽을 통한 예약 시 사용할 수 있습니다.
        </span>
      </div>
      {serialOn ? (
        <u className={style.couponNum}>쿠폰 번호 확인</u>
      ) : (
        <u className={style.couponNum} onClick={showSerialNum}>
          쿠폰 번호 확인
        </u>
      )}

      <div className={style.cardBottom}>
        {serialOn ? (
          <span className={style.couponCon}>{displayText}</span>
        ) : (
          <span className={style.couponCon}>000000000000</span>
        )}
        {coupon.status === "expired" ? (
          <button className={style.used} onClick={handleCouponDel}>
            지우기
          </button>
        ) : (
          <button className={style.used} onClick={handleCouponUsed}>
            사용완료
          </button>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
