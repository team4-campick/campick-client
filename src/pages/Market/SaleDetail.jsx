import React, { useEffect, useState } from 'react';
import style from '../../css/Market/SaleDetail.module.css';
import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

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
  } = salePostDetail;

  const API_BASE_URL = 'http://localhost:8000/api';
  const salePostsEndpoint = `${API_BASE_URL}/sale-posts/${id}`;

  const fetchSalePostDetail = async () => {
    try {
      const response = await fetch(salePostsEndpoint, {
        headers: {
          'Content-Type': 'application/json',
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

  return (
    <section className={style.detailCon}>
      <h2 hidden>SaleDetail</h2>

      <div className={style.productImg}>
        <div className={style.productImgSlide}>
          <Swiper
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation]}
            className={style.detailSlide}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
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
          <span>{isNegotiable ? '가격협의가능' : '가격협의불가'}</span>
          <p className={style.productPrice}>판매 희망가 : {price}원</p>
        </div>{' '}
      </div>
      <div>상품 상태 :{condition}</div>
      <div>{desc}</div>

      <button className={style.inquiryBtn}>문의하기</button>
    </section>
  );
};

export default SaleDetail;
