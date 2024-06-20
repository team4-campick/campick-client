import React from "react";
import style from "../../css/Market/SaleDetail.module.css";

const SaleDetail = () => {
  return (
    <section className={style.detailCon}>
      <h2 hidden>SaleDetail</h2>
      <span>작성자</span>
      <div>제품 종류</div>
      <div>이미지 슬라이드 들어가는 곳</div>
      <div>
        <div>
          <span>0000판매합니다.</span>
          <span>서울</span>
        </div>
        <p>판매 희망가 : 5000원</p>

        <div>상품 상태: </div>
        <div>상품 설명</div>
      </div>
    </section>
  );
};

export default SaleDetail;
