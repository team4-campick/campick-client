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
import ScrollTopBtn from "../components/ScrollTop/ScrollTopBtn";

const MainPage = () => {
  const mainSwiperRef = useRef(null);
  const blogSwiperRef = useRef(null);
  const eventSwiperRef = useRef(null);

  const [proceedingImages, setProceedingImages] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
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
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/blog-posts`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        const latestPosts = data.blogPosts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        setBlogPosts(latestPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogPosts();
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
          {blogPosts.map((post, index) => (
            <SwiperSlide key={post._id}>
              <img
                src={
                  post.backgroundImgUrls?.[0]?.url ||
                  "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                }
                alt={`Slide ${index + 1}`}
              />
              <div className={styles.mainBannerBlog}>
                <strong>{`${post.region}, ${post.city}`}</strong>
                <h3>{post.blogPostTitle}</h3>
                <Link to={`/blog-post-detail/${post._id}`}>Read More</Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.blogTapWarp}>
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation, Controller]}
            className={styles.mainExplainSwiper}
            id={styles.testId}
            onSwiper={(swiper) => {
              blogSwiperRef.current = swiper;
              if (mainSwiperRef.current) {
                swiper.controller.control = mainSwiperRef.current;
                mainSwiperRef.current.controller.control = swiper;
              }
            }}
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post._id}>
                <div className={styles.blog}>
                  <strong>{`${post.region}, ${post.city}`}</strong>
                  <h3>{post.blogPostTitle}</h3>
                  <p>{post.blogPostDesc}</p>
                  <Link to={`/blog-post-detail/${post._id}`}>Read More</Link>
                </div>
              </SwiperSlide>
            ))}
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
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className={styles.mainEventsSwiper}
            ref={eventSwiperRef}
            breakpoints={{
              100: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              800: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
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

export default MainPage;
