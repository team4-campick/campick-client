import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Bingo.module.css";
import BingoCard from "../../components/MyPage/BingoCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Bingo = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;

  const [bingoArea, setBingoArea] = useState([]);
  // const [bingoStatus, setBingoStatus] = useState('');

  const [reviewCount, setReviewCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [missionClear, setMissionClear] = useState(0);
  const [bingoCount, setBingoCount] = useState(0);
  const [continuousConnection, setContinuousConnection] = useState(0);
  const [bingoPattern, setBingoPattern] = useState([]);

  const updateMission = async () => {
    try {
      const response = await fetch(`${url}/update-mission/${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewCount,
          postCount,
          missionClear,
          bingoCount,
        }),
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
      console.log("포카", postCount);
      if (JSON.stringify(bingoArea) !== JSON.stringify(bingo)) {
        getBingoArea();
      }
      console.log("빙고영역", bingoArea);
    } catch (error) {
      console.error(error);
    }
  };
  const getBingoPattern = async () => {
    try {
      const response = await fetch(`${url}/bingo-pattern/${userName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log("빙고 패턴 체크 부분", data);
      console.log(data.bingoPattern);
      setBingoPattern(data.bingoPattern);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  const getBingoArea = async () => {
    try {
      const response = await fetch(`${url}/bingo-area/${userName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log("빙고 영역 체크 부분", data.bingo.bingo);
      setBingoArea(data.bingo.bingo);
      console.log("빙고카운트 확인하는 곳", bingoCount);
    } catch (error) {
      console.error(error);
    }
  };
  const getBingoCount = async () => {
    try {
      const response = await fetch(`${url}/bingo-count/${userName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setBingoCount(data.bingoCount);
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async () => {
    await updateMission();
    await getBingoCount();
    await getBingoPattern();
    console.log("빙고패턴을 확인하려고 합니다", bingoPattern);
  };
  const resetBingo = async () => {
    try {
      const response = await fetch(`${url}/reset-bingo/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
      await getBingoArea();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBingoArea();
    updateMission();
  }, []);

  return (
    <section className={style.bingo}>
      <h3 hidden>Bingo</h3>
      <p className={style.countStatus}>
        지금까지 채운 빙고의 갯수는 <span>{bingoCount}</span>개 입니다
        <button onClick={updateStatus}>refresh</button>
      </p>

      <div className={style.bingoGame}>
        <div className={style.bingoArea}>
          {bingoCount === 8 ? (
            <button onClick={resetBingo}>reset</button>
          ) : null}
          {bingoArea.map((e, i) => (
            <BingoCard key={i + 1} e={e} />
          ))}
          {bingoPattern.map((e, i) => {
            if (e === 1) {
              return (
                <div className={style.bingoPattern} key={i + 1}>
                  {i + 1}번째 패턴
                </div>
              );
            }
          })}
        </div>
        <ul className={style.missionList}>
          <li>
            1. 리뷰 3회 : {reviewCount >= 3 ? "clear" : `${reviewCount} 회`}
          </li>
          <li>
            2. 게시글 2회 작성 : {postCount >= 2 ? "clear" : `${postCount} 회`}
          </li>
          <li>
            3. 미션 3개 완성 :{" "}
            {missionClear >= 3 ? "clear" : `${missionClear} 개`}
          </li>
          <li>
            4. 빙고 2개 달성 :{" "}
            {bingoCount >= 2 ? "clear" : `${bingoCount} 빙고`}
          </li>
          <li>
            5. 리뷰 5회 : {reviewCount >= 5 ? "clear" : `${reviewCount} 회`}
          </li>
          <li>
            6. 게시글 4회 작성 : {postCount >= 4 ? "clear" : `${postCount} 회`}
          </li>
          <li>
            7. 연속 접속일 3일 :{" "}
            {continuousConnection >= 3 ? "clear" : `${continuousConnection}일`}
          </li>
          <li>
            8. 미션 6개 완성 :{" "}
            {missionClear >= 6 ? "clear" : `${missionClear} 개`}{" "}
          </li>
          <li>
            9. 연속 접속일 7일 :{" "}
            {continuousConnection >= 7 ? "clear" : `${continuousConnection}일`}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Bingo;
