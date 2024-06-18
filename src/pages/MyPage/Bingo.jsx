import React from 'react';
import style from '../../css/MyPage/Bingo.module.css';
import BingoCard from '../../components/MyPage/BingoCard';

const Bingo = () => {
  const bingoArea = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <section className={style.Bingo}>
      <h3 hidden>Bingo</h3>
      빙고 영역
      <p className={style.CountStatus}>
        지금까지 채운 빙고의 갯수는 <span>N</span>개 입니다.
      </p>
      <div className={style.BingoArea}>
        {bingoArea.map((e, i) => {
          return BingoCard(i + 1);
        })}
      </div>
      <ul className={style.MissionList}>
        <li>1. 리뷰 3회</li>
        <li>2. 게시글 2회 작성</li>
        <li>3. 캠핑장 1회 방문</li>
        <li>4. 빙고 2개 달성</li>
        <li>5. 리뷰 5회</li>
        <li>6. 게시글 4회 작성</li>
        <li>7. 연속 접속일 3일</li>
        <li>8. 캠핑장 2회 방문</li>
        <li>9. 연속 접속일 7일</li>
      </ul>
    </section>
  );
};

export default Bingo;
