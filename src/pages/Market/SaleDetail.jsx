import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useGetSalePostDetail from "../../hooks/useGetSalePostDetail";
import { setSelectedConversation } from "../../store/chatStore";
import convertToKoreanDate from "../../utils/convertToKoreanDate";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import style from "../../css/Market/SaleDetail.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper/modules";

const SaleDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salePostDetail, isLoading, error, ErrorComponent } =
    useGetSalePostDetail();

  const salePostsEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/sale-posts/${id}`;
  const messageEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/messages/create`;

  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  // 데이터 로딩 전에는 로딩 중임을 표시
  if (isLoading || !salePostDetail) return <LoadingSpinner />;

  // TODO: 에러 케이스 처리
  if (error) return <ErrorComponent />;

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
    createdAt,
    salesStatus,
  } = salePostDetail;

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

  const handleNavigateChat = async () => {
    try {
      const response = await fetch(messageEndpoint, {
        method: "POST",
        body: JSON.stringify({
          receiverId: authorId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await response.json();

      if (!res.result) {
        alert("로그인이 필요합니다.");
        return navigate("/signin");
      }

      dispatch(setSelectedConversation(authorId));
      navigate(`/sale-chat/${authorId}`);
    } catch (error) {
      console.log(error);
      alert("채팅을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
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
        <div className={style.productInfo}>
          <div>
            <div className={style.infoTop}>
              <div>
                <div className={style.productCategory}>{category}</div>{" "}
                <p className={style.productName}>{productName} 판매합니다.</p>
                <div className={style.writerDate}>
                  <span>{author} </span>
                  <span> {convertToKoreanDate(createdAt)}</span>
                </div>
              </div>
              <div className={style.productPriceWrap}>
                <div
                  className={
                    isNegotiable ? style.negotiable : style.nonNegotiable
                  }
                >
                  {isNegotiable ? "협의가능" : "협의불가"}
                </div>
                <span>{price && `${price.toLocaleString("ko-KR")}원`}</span>
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

            <button
              className={`submitButton ${
                salesStatus === "거래완료" ? style.soldOutBtn : " "
              }`}
              onClick={() => {
                if (userId !== authorId) {
                  handleNavigateChat();
                }
              }}
            >
              {userId === authorId
                ? salesStatus
                : salesStatus === "거래완료"
                ? "거래완료"
                : "문의하기"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleDetail;
