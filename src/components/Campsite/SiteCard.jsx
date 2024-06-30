import React from "react";
import style from "./SiteCard.module.css";
import { useNavigate } from "react-router-dom";

const SiteCard = ({ site }) => {
  const navigate = useNavigate();
  const { doNm, sigunguNm, firstImageUrl, facltNm, contentId } = site;
  return (
    <div
      className={style.siteCard}
      onClick={() => {
        navigate(`/site-detail/${contentId}`);
      }}
    >
      <figure>
        <figcaption>
          <p className={style.info}>
            <span>{facltNm}</span>
            <span>{`${doNm} ${sigunguNm}`}</span>
          </p>
          <span className={style.score}>점수</span>
        </figcaption>
        <div className={style.imgCon}>
          <img src={firstImageUrl} alt={facltNm} />
        </div>
      </figure>
    </div>
  );
};

export default SiteCard;
