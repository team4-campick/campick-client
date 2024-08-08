import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Bingo.module.css";
import BingoCard from "../../components/MyPage/BingoCard";
import { useSelector } from "react-redux";
import { COUPON } from "../../constants/coupon";
import { COUPON_ERROR } from "../../constants/errMsg";
import { COUPON_MSG } from "../../constants/couponMsg";
import patternChecker from "../../utils/patternChecker";

const Bingo = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userObjId = user?.id;

  const [bingoArea, setBingoArea] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [missionClear, setMissionClear] = useState(0);
  const [bingoCount, setBingoCount] = useState(0);
  const [continuousConnection, setContinuousConnection] = useState(0);
  const [bingoPattern, setBingoPattern] = useState([]);
  console.log("objId", userObjId);
  const updateMission = async () => {
    try {
      const response = await fetch(`${url}/update-mission/${userObjId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!data) return;
      const mission = await data.mission;
      const bingo = await data.bingo.bingo;

      setPostCount(mission.postCount);
      setReviewCount(mission.reviewCount);
      setContinuousConnection(mission.continuousConnection);
      setMissionClear(mission.missionClear);
      setBingoCount(mission.bingoCount);
      if (JSON.stringify(bingoArea) !== JSON.stringify(bingo)) {
        getBingoArea();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getBingoPattern = async () => {
    try {
      const response = await fetch(`${url}/bingo-pattern/${userObjId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setBingoPattern(data.bingoPattern);
    } catch (error) {
      console.error(error);
    }
  };
  const getBingoArea = async () => {
    try {
      const response = await fetch(`${url}/bingo-area/${userObjId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setBingoArea(data.bingo.bingo);
    } catch (error) {
      console.error(error);
    }
  };
  const getBingoCount = async () => {
    try {
      const response = await fetch(`${url}/bingo-count/${userObjId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setBingoCount(data.bingoCount);
    } catch (error) {
      console.error(error);
    }
  };
  const resetBingo = async () => {
    try {
      const response = await fetch(`${url}/reset-bingo/${userObjId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.result) await getBingoArea();
    } catch (error) {
      console.error(error);
    }
  };
  const couponDuplicateCheck = async (coupon) => {
    try {
      const newCoupon = coupon;
      const response = await fetch(`${url}/check-duplicate/${userObjId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupon: newCoupon,
        }),
        credentials: "include",
      });
      if (response.status === 401) {
        return false;
      }
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(COUPON_ERROR.DUPLICATE, error);
    }
  };
  const couponIssuance = async (coupon) => {
    try {
      const newCoupon = coupon;
      const response = await fetch(`${url}/coupon/${userObjId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon: newCoupon }),
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateStatus = async () => {
    await updateMission();
    await getBingoCount();
    await getBingoPattern();
  };
  const handleCoupon = async (coupon) => {
    const couponCheck = await couponDuplicateCheck(coupon);
    if (couponCheck) {
      alert(COUPON_ERROR.EXIST);
    } else {
      const couponIssue = await couponIssuance(coupon);
      if (couponIssue) {
        alert(COUPON_MSG.SUCCESS);
      }
    }
  };
  useEffect(() => {
    getBingoArea();
    updateMission();
    getBingoPattern();
  }, [userObjId, url]);

  return (
    <section className={style.bingo}>
      <h3 hidden>Bingo</h3>
      <div className={style.bingoGame}>
        <div className={style.bingoBoard}>
          <div className={style.bingoBanner}>
            <span className={style.bannerText}>BINGO!!</span>
          </div>
          <div className={style.bingoCon}>
            <div className={style.bingoArea}>
              {bingoCount === 8 ? (
                <button className={style.resetBingoBtn} onClick={resetBingo}>
                  reset
                </button>
              ) : null}
              {bingoArea.map((e, i) => (
                <BingoCard key={i + 1} e={e} />
              ))}
              <div className={style.patternArea}>
                {patternChecker(style, bingoPattern)}
              </div>
            </div>
          </div>
        </div>
        <div className={style.bingoResultCon}>
          <p className={style.countStatus}>
            지금까지 채운 빙고의 갯수는 <span>&nbsp;{bingoCount}</span>개 입니다
            <button onClick={updateStatus} className={style.updateBtn}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </p>
          <div className={style.resultCon}>
            <div className={style.missionCon}>
              <ul className={style.missionList}>
                <li>
                  <span>1. 리뷰 3회 </span>
                  <span className={style.result}>
                    {reviewCount >= 3 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${reviewCount} 회`
                    )}
                  </span>
                </li>
                <li>
                  <span>2. 게시글 2회 작성</span>
                  <span className={style.result}>
                    {postCount >= 2 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${postCount} 회`
                    )}
                  </span>
                </li>
                <li>
                  <span>3. 미션 3개 완성</span>
                  <span className={style.result}>
                    {missionClear >= 3 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${missionClear} 개`
                    )}
                  </span>
                </li>
                <li>
                  <span>4. 빙고 2개 달성</span>
                  <span className={style.result}>
                    {bingoCount >= 2 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${bingoCount} 빙고`
                    )}
                  </span>
                </li>
                <li>
                  <span>5. 리뷰 5회</span>
                  <span className={style.result}>
                    {reviewCount >= 5 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${reviewCount} 회`
                    )}
                  </span>
                </li>
                <li>
                  <span>6. 게시글 4회 작성</span>
                  <span className={style.result}>
                    {postCount >= 4 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${postCount} 회`
                    )}
                  </span>
                </li>
                <li>
                  <span>7. 연속 접속일 3일</span>
                  <span className={style.result}>
                    {continuousConnection >= 3 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${continuousConnection}일`
                    )}
                  </span>
                </li>
                <li>
                  <span>8. 미션 6개 완성</span>
                  <span className={style.result}>
                    {missionClear >= 6 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${missionClear} 개`
                    )}
                  </span>
                </li>
                <li>
                  <span>9. 연속 접속일 7일</span>
                  <span className={style.result}>
                    {continuousConnection >= 7 ? (
                      <span className={style.clear}>clear</span>
                    ) : (
                      `${continuousConnection}일`
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className={style.couponCon}>
              <ul className={style.couponList}>
                {COUPON.map((item, i) => {
                  return (
                    <li key={item} className={style[item]}>
                      <span className={style.coupon}>{item.CONDITION}</span>
                      {bingoCount >= i + 1 ? (
                        <button onClick={() => handleCoupon(item)}>발급</button>
                      ) : (
                        <button disabled>발급</button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bingo;
