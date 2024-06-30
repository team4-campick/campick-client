import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import style from "../../css/Campsite/SiteDetail.module.css";
import { useParams } from "react-router-dom";

const { kakao } = window;

const SiteDetail = () => {
  const { id } = useParams();
  const [site, setSite] = useState([]);
  console.log("contentId", id);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  useEffect(() => {
    const imageList = async () => {
      try {
        const baseUrl = `https://apis.data.go.kr/B551011/GoCamping/imageList?MobileOS=ETC&MobileApp=campick&serviceKey=CigWDfrtb8KsC1aESUqp9aphPSv1K5o2HU0pHEh4sSWPlZJSa3Lk73vRKi2Xy9uMg%2B6Ae%2FrbnS0iq7T2f9YASA%3D%3D&_type=json&contentId=${id}`;
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        console.log("response", response);
        const data = await response.json();
        console.log(data);
        setSite(data.response.body.items.item);
        console.log(site);
      } catch (e) {
        console.error(e);
      }
    };
    imageList();
  }, []);
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
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
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.siteDetailBanner}
        >
          {site.map((item) => (
            <SwiperSlide key={item}>
              <img src={item.imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.siteDetailSubBanner}
        >
          {site.map((item) => (
            <SwiperSlide key={item}>
              <img src={item.imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className={style.siteInfo}>
        <h3>
          <a href="https://www.apple.com/kr/" target="_blank">
            Camp Name <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </h3>
        <span>camping type</span>
        <span>West Coast</span>
        <span>Average Ratings</span>
      </p>
      <div className={style.optionCon}>
        <h3>Option</h3>옵션들이 들어갈 영역입니다.
      </div>
      <div id="map" className={style.siteMap}></div>
      <div>
        <h3>What People are Saying</h3>
        <ul>
          <li>reviews</li>
          <li>reviews</li>
          <li>reviews</li>
          <li>reviews</li>
          <li>reviews</li>
        </ul>
      </div>
    </section>
  );
};

export default SiteDetail;
