import React, { useEffect, useState } from "react";
import style from "../../css/Market/SaleDetail.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper/modules";

const SaleDetail = () => {
  const { id } = useParams();
  const [salePostDetail, setSalePostDetail] = useState({});

  const {
    category,
    productName,
    region,
    city,
    condition,
    price,
    desc,
    isNegotiable,
    imageUrls = [],
  } = salePostDetail;

  const API_BASE_URL = "http://localhost:8000/api";
  const salePostsEndpoint = `${API_BASE_URL}/sale-posts/${id}`;

  const fetchSalePostDetail = async () => {
    try {
      const response = await fetch(salePostsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }
      setSalePostDetail(data.salePost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalePostDetail();
  }, []);

  const navigate = useNavigate();
  const deleteSalePost = async () => {
    try {
      const response = await fetch(salePostsEndpoint, {
        method: "DELETE",
      });
      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }
      alert("삭제가 완료되었습니다.");
      navigate("/market");
    } catch (error) {
      console.log(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };
  const editPost = () => {
    navigate(`/sale-post-edit/${id}`);
  };

  return (
    <section className={style.detailCon}>
      <h2 hidden>SaleDetail</h2>
      <div>
        <button onClick={editPost}>수정</button>
        <button onClick={deleteSalePost}>삭제</button>
      </div>
      <div className={style.productImg}>
        <div className={style.productImgSlide}>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation]}
            className={style.detailSlide}
          >
            {imageUrls.map((image, index) => (
              <SwiperSlide>
                <img
                  key={image._id}
                  src={image.url}
                  alt={`상품이미지 ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <span className={style.writer}>작성자</span>
      </div>
      <div className={style.productInfo}>
        <div>
          <div className={style.productCategory}>{category}</div>
          <p className={style.productName}>{productName}판매합니다.</p>
          <span className={style.region}>
            지역 : {region}/{city}
          </span>
        </div>
        <div className={style.priceCon}>
          <span>{isNegotiable ? "가격협의가능" : "가격협의불가"}</span>
          <p className={style.productPrice}>판매 희망가 : {price}원</p>
        </div>{" "}
      </div>
      <div>상품 상태 : {condition}</div>
      <div>상품 설명 : {desc}</div>
      <div className={style.btnWrap}>
        <Link to='/market'>
          <i className='fa-solid fa-chevron-left'></i>
        </Link>
        <Link to='/sale-chat/:id'>
          <button className={style.inquiryBtn}>문의하기</button>
        </Link>
      </div>
    </section>
  );
};

export default SaleDetail;
