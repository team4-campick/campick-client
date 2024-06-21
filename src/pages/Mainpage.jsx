import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import YouTube from "react-youtube";
import {
  Autoplay,
  FreeMode,
  Pagination,
  Navigation,
  Controller,
} from "swiper/modules";

import styles from "../css/mainpage.module.css"; // CSS 모듈로 임포트

const Mainpage = () => {
  const mainSwiperRef = useRef(null);
  const blogSwiperRef = useRef(null);

  return (
    <>
      {/* 메인화면 비주얼 영역 */}
      <section className={styles.mainVisual}>
        {/* 슬라이드 제어 불가 영역- 배경이미지 */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          allowTouchMove={false} // 마우스로 슬라이드 불가능
          modules={[Controller]}
          className={styles.mainBackgroundSwiper}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
            if (blogSwiperRef.current) {
              swiper.controller.control = blogSwiperRef.current;
              blogSwiperRef.current.controller.control = swiper;
            }
          }}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>

        <div className={styles.blogTapWarp}>
          {/* 슬라이드 제어 가능 영역- 설명페이지 */}
          <Swiper
            spaceBetween={4}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, Controller]}
            className={styles.mainExplainSwiper}
            onSwiper={(swiper) => {
              blogSwiperRef.current = swiper;
              if (mainSwiperRef.current) {
                swiper.controller.control = mainSwiperRef.current;
                mainSwiperRef.current.controller.control = swiper;
              }
            }}
          >
            <SwiperSlide>
              <div className={styles.firstBlog}>
                <p>위치정보1</p>
                <strong>정보1</strong>
                <p>내용1</p>
                <Link to="/blog/1">Read More1</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.secondBlog}>
                <p>위치정보2</p>
                <strong>정보2</strong>
                <p>내용2</p>
                <Link to="/blog/2">Read More2</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.thirdBlog}>
                <p>위치정보3</p>
                <strong>정보3</strong>
                <p>내용3</p>
                <Link to="/blog/3">Read More3</Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className={styles.mainVideoWarp}>
        {/* 유튜브 영상 섹션 전체 처리완료 */}
        <h3>Today's video</h3>
        <div className={styles.mainVideo}>
          <YouTube
            videoId="X5Y-zlsKL2M"
            opts={{
              width: "100%",
              height: "540px",
              playerVars: {
                autoplay: 1,
                controls: 1,
                rel: 0,
                modestbranding: 1,
                loop: 1,
                playlist: "X5Y-zlsKL2M",
                start: 580,
              },
            }}
            onReady={(e) => {
              e.target.mute();
            }}
          />
        </div>
      </section>

      <section className={styles.mainEventsWarp}>
        {/* 이벤트 슬라이드 진행필요 */}
        <h3>Today's event</h3>
        <div className={styles.mainEvents}>
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className={styles.mainEventsSwiper}
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
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Mainpage;
