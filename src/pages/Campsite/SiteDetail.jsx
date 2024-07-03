import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import style from "../../css/Campsite/SiteDetail.module.css";
import { useLocation, useParams } from "react-router-dom";
import ReviewCard from "../../components/Campsite/ReviewCard";
import ReviewCreateModal from "../../components/Campsite/ReviewCreateModal";
import { useSelector } from "react-redux";

const { kakao } = window;

const SiteDetail = () => {
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;
  const { id } = useParams();
  const { state } = useLocation();
  const { mapX, mapY, facltNm, addr1, induty, resveUrl, sbrsCl } = state;

  // const [modal, setModal] = useState(false);
  const [siteImg, setSiteImg] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [scoreAvg, setScoreAvg] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const url = process.env.REACT_APP_SERVER_URL;
  const apiUrl = process.env.REACT_APP_SERVICE_URL;
  const apiKey = process.env.REACT_APP_SERVICE_KEY;
  const apiOS = process.env.REACT_APP_SERVICE_OS;
  const apiType = process.env.REACT_APP_SERVICE_TYPE;
  const apiName = process.env.REACT_APP_SERVICE_NAME;

  // try {
  //   const response = await fetch(`${url}/review/${id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  //   const data = await response.json();
  //   console.log("review Detail Area test ", data);
  // } catch (error) {
  //   console.error(error);
  // }

  const calcAvg = async (data) => {
    const avg = await Math.round(
      data?.reduce((acc, review) => acc + data.score, 0) / (data?.length || 1)
    );
    setScoreAvg(avg);
    console.log("avg", avg);
    console.log("scoreAvg", scoreAvg);
  };

  useEffect(() => {
    const imageList = async () => {
      try {
        const baseUrl = new URL(
          `${apiUrl}imageList?MobileOS=${apiOS}&MobileApp=${apiName}&numOfRows=12&serviceKey=${apiKey}&_type=${apiType}&contentId=${id}`
        );
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        console.log("response", response);
        const data = await response.json();
        console.log(data);
        setSiteImg(data.response.body.items.item);
      } catch (e) {
        console.error(e);
      }
    };
    imageList();
  }, []);
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        Number(mapY).toFixed(6),
        Number(mapX).toFixed(6)
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      Number(mapY).toFixed(6),
      Number(mapX).toFixed(6)
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
  useEffect(() => {
    const getReviewLst = async () => {
      try {
        console.log("리뷰 가져오기 실행");
        const response = await fetch(`${url}/get-reviews/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log("사이트 디테일 페이지 데이터 체크 : ", data.reviews);
        setReviews(data.reviews);
        await calcAvg(reviews);
      } catch (error) {
        console.error(error);
      }
    };
    getReviewLst();
  }, []);
  return (
    <section className={style.siteDetail}>
      <h2 hidden>SiteDetail</h2>
      <div className={style.bannerCon}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          // loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.siteDetailBanner}
        >
          {siteImg ? (
            siteImg.map((item) => (
              <SwiperSlide key={item}>
                <img src={item.imageUrl} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src={
                  "https://img.freepik.com/free-vector/camping-with-caravan-illustration_23-2148671151.jpg?t=st=1719940461~exp=1719944061~hmac=cd44c5d77dbbd15763529c53c68fe2ac04a2b679627fa15f3602451ff14e0ea7&w=1380"
                }
              />
            </SwiperSlide>
          )}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          // loop={true}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.siteDetailSubBanner}
        >
          {siteImg ? (
            siteImg.map((item) => (
              <SwiperSlide key={item}>
                <img src={item.imageUrl} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src={
                  "https://img.freepik.com/free-vector/camping-with-caravan-illustration_23-2148671151.jpg?t=st=1719940461~exp=1719944061~hmac=cd44c5d77dbbd15763529c53c68fe2ac04a2b679627fa15f3602451ff14e0ea7&w=1380"
                }
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <p className={style.siteInfo}>
        <h3>
          <a href={resveUrl} target="_blank">
            {facltNm} <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </h3>
        <span>{induty}</span>
        <span>{addr1}</span>
        {/* <StarRating scoreAvg={scoreAvg} /> */}
      </p>
      <div className={style.optionCon}>
        <h3>Option</h3>
        {sbrsCl}
      </div>
      <div id="map" className={style.siteMap}></div>
      <div className={style.reviewArea}>
        <div className={style.reviewHeader}>
          <h3>What People are Saying</h3>
          <button
            className={style.writeBtn}
            onClick={() => {
              userName ? setModalOpen(true) : alert("로그인 후 이용해주세요.");
            }}
          >
            리뷰 쓰기
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
        <ul className={style.reviewCon}>
          {reviews.length !== 0 ? (
            reviews.map((item) => (
              <ReviewCard item={item} userName={userName} />
            ))
          ) : (
            <li>리뷰가 없어요</li>
          )}
        </ul>
      </div>
      {modalOpen === true ? (
        <ReviewCreateModal setModalOpen={setModalOpen} id={id} />
      ) : null}
    </section>
  );
};

export default SiteDetail;
