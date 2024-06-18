import React from 'react';
import style from './BingoCard.module.css';

const BingoCard = ({ e }) => {
  return (
    <div className={style.BingoCard}>
      <div className={style.Front}>{e}</div>
      <div className={style.Back}></div>
    </div>
  );
};

export default BingoCard;
