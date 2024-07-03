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
import styles from "../css/mainpage.module.css";

const Mainpage = () => {
  const mainSwiperRef = useRef(null);
  const blogSwiperRef = useRef(null);
  const eventSwiperRef = useRef(null);

  const [proceedingImages, setProceedingImages] = useState([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = updateImageStatuses(allImages);
      const today = new Date();
      const proceedingImages = filterImagesByDate(updatedImages, today, false);
      setProceedingImages(proceedingImages);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (eventSwiperRef.current) {
      const swiper = eventSwiperRef.current.swiper;
      swiper.on("slideChange", () => {
        setIsPrevDisabled(swiper.isBeginning);
        setIsNextDisabled(swiper.isEnd);
      });
    }
  }, [eventSwiperRef]);

  const handlePrev = () => {
    if (eventSwiperRef.current && !isPrevDisabled) {
      eventSwiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (eventSwiperRef.current && !isNextDisabled) {
      eventSwiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <section className={styles.mainVisual}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          allowTouchMove={false}
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
          <Swiper
            spaceBetween={4}
            centeredSlides={true}
            pagination={{ clickable: true }}
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
        <h2>Today's Video</h2>
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
        <h2>Today's Event</h2>
        <div className={styles.mainEvents}>
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className={styles.mainEventsSwiper}
            ref={eventSwiperRef}
          >
            {proceedingImages.slice(0, 10).map((image) => (
              <SwiperSlide key={image.name}>
                <Link to="/event">
                  <img src={image.url} alt={image.name} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`${styles.prevButton} ${
              isPrevDisabled ? styles.buttonDisabled : ""
            }`}
            onClick={handlePrev}
          >
            <i className="fa-solid fa-angle-left fa-3x"></i>
          </div>
          <div
            className={`${styles.nextButton} ${
              isNextDisabled ? styles.buttonDisabled : ""
            }`}
            onClick={handleNext}
          >
            <i className="fa-solid fa-angle-right fa-3x"></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mainpage;
