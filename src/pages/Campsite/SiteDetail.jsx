import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import style from "../../css/Campsite/SiteDetail.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewCard from "../../components/Campsite/ReviewCard";
import ReviewCreateModal from "../../components/Campsite/ReviewCreateModal";
import { useSelector } from "react-redux";
import { GiElectric, GiTrail, GiWoodBeam } from "react-icons/gi";
import { FaDumbbell, FaSwimmingPool, FaWifi } from "react-icons/fa";
import { BsFillCupHotFill } from "react-icons/bs";
import { RiStore3Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";
import Loading from "../../components/Loading/Loading";
import StarRating from "../../components/Campsite/StarRating";
const { kakao } = window;

const SiteDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;
  const { id } = useParams();
  const { state } = useLocation();
  const { mapX, mapY, facltNm, addr1, induty, homepage, sbrsCl } = state;
  const [siteImg, setSiteImg] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [scoreAvg, setScoreAvg] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const url = process.env.REACT_APP_SERVER_URL;
  const apiUrl = process.env.REACT_APP_SERVICE_URL;
  const apiKey = process.env.REACT_APP_SERVICE_KEY;
  const apiOS = process.env.REACT_APP_SERVICE_OS;
  const apiType = process.env.REACT_APP_SERVICE_TYPE;
  const apiName = process.env.REACT_APP_SERVICE_NAME;
  const newArr = sbrsCl.split(",");
  const newImgArr = siteImg?.splice(1, 3);

  const calcAvg = async (data) => {
    console.log("data", data);
    if (data.length === 0) {
      setScoreAvg(0);
      return;
    }
    let total = 0;
    data?.forEach((e) => (total += e.score));

    const avg = Math.round(total / data?.length);
    setScoreAvg(avg);
  };

  useEffect(() => {
    const imageList = async () => {
      setLoading(true);
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
        const data = await response.json();
        setSiteImg(data.response.body.items.item);
        setLoading(false);
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
        Number(mapY ? mapY : 127.0277194).toFixed(6),
        Number(mapX ? mapX : 37.63695556).toFixed(6)
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      Number(mapY ?? 127.0277194).toFixed(6),
      Number(mapX ?? 37.63695556).toFixed(6)
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
        const response = await fetch(`${url}/review/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log("사이트 디테일 페이지 데이터 체크 : ", data.reviews);
        setReviews(data.reviews);
        await calcAvg(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };
    getReviewLst();
  }, []);
  return (
    <section className={style.siteDetail}>
      <h2 hidden>SiteDetail</h2> {loading ? <Loading /> : null}
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
          {newImgArr ? (
            newImgArr.map((item) => (
              <SwiperSlide key={item}>
                <img src={item.imageUrl} onLoad={() => {}} />
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
          loop={true}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.siteDetailSubBanner}
        >
          {newImgArr ? (
            newImgArr.map((item) => (
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
          <a href={homepage ? homepage : "*"} target="_blank">
            {facltNm} <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </h3>
        <span>{induty}</span>
        <StarRating scoreAvg={scoreAvg} />
        <span>{addr1}</span>
      </p>
      <div className={style.optionCon}>
        <h3>Option</h3>
        <div className={style.options}>
          {newArr.map((e) => {
            if (e === "전기")
              return (
                <div className={style.option}>
                  <GiElectric />
                  <span>{e}</span>
                </div>
              );
            if (e === "무선인터넷")
              return (
                <div className={style.option}>
                  <FaWifi />
                  <span>{e}</span>
                </div>
              );
            if (e === "장작판매")
              return (
                <div className={style.option}>
                  <GiWoodBeam />
                  <span>{e}</span>
                </div>
              );
            if (e === "온수")
              return (
                <div className={style.option}>
                  <BsFillCupHotFill />
                  <span>{e}</span>
                </div>
              );
            if (e === "트렘폴린") return;
            if (e === "물놀이장")
              return (
                <div className={style.option}>
                  <FaSwimmingPool />
                  <span>{e}</span>
                </div>
              );
            if (e === "놀이터") return;
            if (e === "산책로")
              return (
                <div className={style.option}>
                  <GiTrail />
                  <span>{e}</span>
                </div>
              );
            if (e === "운동장")
              return (
                <div className={style.option}>
                  <FaDumbbell />
                  <span>{e}</span>
                </div>
              );
            if (e === "운동시설")
              return (
                <div className={style.option}>
                  <FaDumbbell />
                  <span>{e}</span>
                </div>
              );
            if (e === "마트.편의점")
              return (
                <div className={style.option}>
                  <RiStore3Fill />
                  <span>{e}</span>
                </div>
              );
            if (e === "덤프스테이션")
              return (
                <div className={style.option}>
                  <FaTrash /> <span>{e}</span>
                </div>
              );
            else return <div>정보 없음</div>;
          })}
        </div>
      </div>
      <div id="map" className={style.siteMap}></div>
      <div className={style.reviewArea}>
        <div className={style.reviewHeader}>
          <h3>What People are Saying</h3>
          <button
            className={style.writeBtn}
            onClick={() => {
              if (userName) {
                setModalOpen(true);
              } else {
                alert("로그인 후 이용해주세요.");
                navigate("/signin");
              }
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
            <li className={style.noReview}>리뷰가 없어요</li>
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
