import React from "react";
import style from "./BingoCard.module.css";

const BingoCard = ({ e }) => {
  const backImgList = [
    "https://img.icons8.com/ios-filled/100/055a5b/camping-tent.png",
    "https://img.icons8.com/pastel-glyph/64/055a5b/camping-gas-burner.png",
    "https://img.icons8.com/ios-filled/100/055a5b/compass-west.png",
    "https://img.icons8.com/glyph-neue/64/055a5b/trailer.png",
    "https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/055a5b/external-bonfire-winter-vitaliy-gorbachev-fill-vitaly-gorbachev.png",
    "https://img.icons8.com/ios-filled/100/055a5b/campsite.png",
    "https://img.icons8.com/ios-filled/100/055a5b/weber.png",
    "https://img.icons8.com/ios-filled/100/055a5b/fishing-pole.png",
    "https://img.icons8.com/ios-filled/100/055a5b/trekking.png",
  ];
  return (
    <div className={`${style.bingoCard} ${e.state === 1 ? style.on : ""}`}>
      <div className={style.front}>{e.mission}</div>
      <div className={style.back}>
        <img src={`${backImgList[e.mission - 1]}`} alt="bingoCard" />
      </div>
    </div>
  );
};

export default BingoCard;
