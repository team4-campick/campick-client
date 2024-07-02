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

const { kakao } = window;

const SiteDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { mapX, mapY, facltNm, addr1, induty, resveUrl, sbrsCl } = state;

  const [siteImg, setSiteImg] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const url = process.env.REACT_APP_SERVER_URL;
  const apiUrl = process.env.REACT_APP_SERVICE_URL;
  const apiKey = process.env.REACT_APP_SERVICE_KEY;
  const apiOS = process.env.REACT_APP_SERVICE_OS;
  const apiType = process.env.REACT_APP_SERVICE_TYPE;
  const apiName = process.env.REACT_APP_SERVICE_NAME;

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const handleReviewCreate = async () => {};
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
        const response = await fetch(`${url}/get-reviews/${id}`, {
          method: "GET",
        });
        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
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
          {siteImg.map((item) => (
            <SwiperSlide key={item}>
              <img src={item.imageUrl} />
            </SwiperSlide>
          ))}
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
          {siteImg.map((item) => (
            <SwiperSlide key={item}>
              <img src={item.imageUrl} />
            </SwiperSlide>
          ))}
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
        <span>Average Ratings</span>
      </p>
      <div className={style.optionCon}>
        <h3>Option</h3>
        {sbrsCl}
      </div>
      <div id="map" className={style.siteMap}></div>
      <div className={style.reviewArea}>
        <div className={style.reviewHeader}>
          <h3>What People are Saying</h3>
          <button className={style.writeBtn} onClick={() => setModalOpen(true)}>
            리뷰 쓰기
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
        <ul className={style.reviewCon}>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          {reviews.map((e) => {})}
        </ul>
      </div>
      {modalOpen && (
        <div
          className={"modal-container"}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={"modal-content"}>
            <ReviewCreateModal />
            <button
              className={"modal-close-btn"}
              onClick={() => setModalOpen(false)}
            >
              모달 닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SiteDetail;
