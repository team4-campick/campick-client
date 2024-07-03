import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import YouTube from "react-youtube";
import { Autoplay, Pagination, Navigation, Controller } from "swiper/modules";
import { allImages } from "../utils/imageData";
import { filterImagesByDate, updateImageStatuses } from "../utils/EventUtils";
import styles from "../css/mainpage.module.css"; // CSS 모듈로 임포트

const Mainpage = () => {
  const mainSwiperRef = useRef(null);
  const blogSwiperRef = useRef(null);

  const [proceedingImages, setProceedingImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = updateImageStatuses(allImages);
      const today = new Date();
      const proceedingImages = filterImagesByDate(updatedImages, today, false);
      setProceedingImages(proceedingImages);
    };
    fetchImages();
  }, []);

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
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
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
                <strong>위치정보1</strong>
                <h3>정보1</h3>
                <p>내용1</p>
                <Link to="/blog/1">Read More1</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.secondBlog}>
                <strong>위치정보2</strong>
                <h3>정보2</h3>
                <p>내용2</p>
                <Link to="/blog/2">Read More2</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.thirdBlog}>
                <strong>위치정보3</strong>
                <h3>정보3</h3>
                <p>내용3</p>
                <Link to="/blog/3">Read More3</Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className={styles.mainVideoWarp}>
        {/* 유튜브 영상 섹션 전체 처리완료 */}
        <h2>Today's video</h2>
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
        <h2>Today's event</h2>
        <div className={styles.mainEvents}>
          <Link to="/event">
            <Swiper
              slidesPerView={4}
              spaceBetween={15}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              className={styles.mainEventsSwiper}
            >
              {proceedingImages.map((image) => (
                <SwiperSlide key={image.name}>
                  <img src={image.url} alt={image.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Mainpage;
