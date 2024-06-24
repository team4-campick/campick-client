import React, { useEffect, useState } from 'react';
import style from '../../css/MyPage/Bingo.module.css';
import BingoCard from '../../components/MyPage/BingoCard';
import useBingoCounter from '../../hooks/useBingoCounter';

const Bingo = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const [bingoStatus, setBingoStatus] = useState('');
  const [continuousConnection, setContinuousConnection] = useState(2);
  const [reviewCount, setReviewCount] = useState(6);
  const [numberCampsiteVisits, setNumberCampsiteVisits] = useState(0);
  const [postCount, setPostCount] = useState(6);
  const [bingoCount, setBingoCount] = useState(0);
  const [missionClear, setMissionClear] = useState(0);
  const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
  };
  // ================= 서버로 옮기는게 좋을거 같은 부분 ===========================
  const bingoArea = [
    { mission: 1, state: reviewCount >= 3 ? 1 : 0 },
    { mission: 2, state: postCount >= 2 ? 1 : 0 },
    { mission: 3, state: missionClear >= 3 ? 1 : 0 },
    { mission: 4, state: bingoCount >= 2 ? 1 : 0 },
    { mission: 5, state: reviewCount >= 5 ? 1 : 0 },
    { mission: 6, state: postCount >= 4 ? 1 : 0 },
    { mission: 7, state: continuousConnection >= 3 ? 1 : 0 },
    { mission: 8, state: missionClear >= 6 ? 1 : 0 },
    { mission: 9, state: continuousConnection >= 7 ? 1 : 0 },
  ];
  shuffle(bingoArea);
  console.log(bingoArea);
  // =======================================================================
  const getBingoStatus = async () => {
    try {
      const response = await fetch(`${url}/bingo-status`);
      const data = await response.json();
      if (!data) {
        alert('뭔가 잘못됨');
      }
      setBingoStatus(data);
    } catch (error) {
      console.error(error);
    }
  };

  const count = useBingoCounter(bingoArea);
  useEffect(() => {
    setBingoCount(count);
  }, [count]);
  useEffect(() => {
    bingoArea.map((e) => {
      // console.log(e.mission, e.state);

      if (e.state === 1) setMissionClear(missionClear + 1);
    });
    // bingoArea.forEach((e) => {
    //   if (e.state === 1) setMissionClear(missionClear + 1);
    // });
  }, []);
  return (
    <section className={style.bingo}>
      <h3 hidden>Bingo</h3>
      <p className={style.countStatus}>
        지금까지 채운 빙고의 갯수는 <span>{count}</span>개 입니다.
      </p>
      <div className={style.bingoArea}>
        {
          (console.log('bingoArea in Html', bingoArea),
          bingoArea.map((e, i) => <BingoCard key={i + 1} e={e} />))
        }
      </div>
      <ul className={style.missionList}>
        <li>
          1. 리뷰 3회 : {reviewCount >= 3 ? 'clear' : `${reviewCount} 회`}
        </li>
        <li>
          2. 게시글 2회 작성 : {postCount >= 2 ? 'clear' : `${postCount} 회`}
        </li>
        <li>
          3. 미션 3개 완성 :{' '}
          {missionClear >= 3 ? 'clear' : `${missionClear} 개`}
        </li>
        <li>
          4. 빙고 2개 달성 : {bingoCount >= 2 ? 'clear' : `${bingoCount} 빙고`}
        </li>
        <li>
          5. 리뷰 5회 : {reviewCount >= 5 ? 'clear' : `${reviewCount} 회`}
        </li>
        <li>
          6. 게시글 4회 작성 : {postCount >= 4 ? 'clear' : `${postCount} 회`}
        </li>
        <li>
          7. 연속 접속일 3일 :{' '}
          {continuousConnection >= 3 ? 'clear' : `${continuousConnection}일`}
        </li>
        <li>
          8. 미션 6개 완성 :{' '}
          {missionClear >= 6 ? 'clear' : `${missionClear} 개`}{' '}
        </li>
        <li>
          9. 연속 접속일 7일 :{' '}
          {continuousConnection >= 7 ? 'clear' : `${continuousConnection}일`}
        </li>
      </ul>
    </section>
  );
};

export default Bingo;
