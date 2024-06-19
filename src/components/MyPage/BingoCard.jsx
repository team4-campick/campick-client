import React from 'react';
import style from './BingoCard.module.css';

const BingoCard = ({ e }) => {
  return (
    <div className={style.bingoCard}>
      <div className={style.front}>{e}</div>
      <div className={style.back}></div>
    </div>
  );
};

export default BingoCard;
