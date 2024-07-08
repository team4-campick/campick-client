import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    author,
    authorId,
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

  const salePostsEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/sale-posts/${id}`;

  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  console.log("author===", authorId);

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
  }, [id]);

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
    <section className={`mw ${style.detailCon}`}>
      <h2 hidden>SaleDetail</h2>
      {userId === authorId && (
        <div className={style.editDeletes}>
          <button onClick={editPost}>수정</button>
          <button onClick={deleteSalePost}>삭제</button>
        </div>
      )}
      <div className={style.detailWrap}>
        <div className={style.productImgSlideWrap}>
          <div className={style.productImgSlide}>
            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              modules={[Pagination, Navigation]}
              className={style.detailSlide}
            >
              {imageUrls.map((image, index) => (
                <SwiperSlide key={image._id}>
                  <img src={image.url} alt={`상품이미지 ${index + 1}`} />
                </SwiperSlide>
              ))}
              <div
                className={`swiper-button-next ${style.customNavigation}`}
              ></div>
              <div
                className={`swiper-button-prev ${style.customNavigation}`}
              ></div>
            </Swiper>
          </div>
        </div>
        <div className={style.productInfo}>
          <div>
            <div>
              <span className={style.writer}>{author} </span>
              <div className={style.productCategory}>{category}</div>
              <p className={style.productName}>{productName} 판매합니다.</p>
            </div>
            <div className={style.productPriceWrap}>
              <span>{price && `${price.toLocaleString("ko-KR")}원`}</span>
              <div
                className={
                  isNegotiable ? style.negotiable : style.nonNegotiable
                }
              >
                {isNegotiable ? "협의가능" : "협의불가"}
              </div>
            </div>
            <ul className={style.productInfoList}>
              <li className={style.region}>
                거래 지역 : {region} {city}
              </li>
              <li>상품 상태 : {condition}</li>
              <li>상품 설명 : {desc}</li>
            </ul>
          </div>
          <div className="submitButtonWrap">
            <Link to="/market">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <Link to="/sale-chat">
              <button className="submitButton">문의하기</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleDetail;
