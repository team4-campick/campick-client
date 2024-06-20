import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "../css/mainpage.module.css"; // CSS 모듈로 임포트
import YouTube from "react-youtube";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Mainpage = () => {
  return (
    <>
      {" "}
      {/* 메인화면 비주얼 영역 */}
      <section className={styles.mainVisual}>
        {/* 슬라이드 제어 불가 영역- 배경이미지 */}

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
        <div className={styles.blogTapWarp}>
          {/* 슬라이드 제어 가능 영역- 설명페이지 */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              Slide 1
              <div className={styles.firstBlog}>
                <p>위치정보</p>
                <strong>정보</strong>
                <p>내용</p>
                <Link to="/blog/1">Read More</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              Slide 2
              <div className={styles.secondBlog}>
                <p>위치정보</p>
                <strong>정보</strong>
                <p>내용</p>
                <Link to="/blog/2">Read More</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              Slide 3
              <div className={styles.thirdBlog}>
                <p>위치정보</p>
                <strong>정보</strong>
                <p>내용</p>
                <Link to="/blog/3">Read More</Link>
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
                controls: 0,
                rel: 0,
                modestbranding: 1,
                loop: 1,
                playlist: "X5Y-zlsKL2M",
                start: 580,
              },
            }}
            onReady={(e) => {
              e.target.unMute();
            }}
          />
        </div>
      </section>
      <section className={styles.mainEventsWarp}>
        {/* 이벤트 슬라이드 진행필요 */}
        <h3>Today's event</h3>
        <div className={styles.mainEvents}>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
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
