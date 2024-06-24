import React from 'react';
import style from './BingoCard.module.css';

const BingoCard = ({ e }) => {
  return (
    <div className={`${style.bingoCard} ${e.state === 1 ? style.on : ''}`}>
      <div className={style.front}>{e.mission}</div>
      <div className={style.back}></div>
    </div>
  );
};

export default BingoCard;
