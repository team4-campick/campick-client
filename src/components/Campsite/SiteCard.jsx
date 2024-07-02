import React from "react";
import style from "./SiteCard.module.css";
import { useNavigate } from "react-router-dom";

const SiteCard = ({ site }) => {
  const navigate = useNavigate();
  console.log("site", site);
  const { doNm, sigunguNm, firstImageUrl, facltNm, contentId } = site;
  return (
    <div
      className={style.siteCard}
      onClick={() => {
        navigate(`/site-detail/${contentId}`, { state: site });
      }}
    >
      <figure>
        <figcaption>
          {/* <p className={style.info}> */}
          <span>{facltNm}</span>
          <span>{`${doNm} ${sigunguNm}`}</span>
          {/* </p> */}
          {/* <span className={style.score}>점수</span> */}
        </figcaption>
        <div className={style.imgCon}>
          {firstImageUrl ? (
            <img src={firstImageUrl} alt={facltNm} />
          ) : (
            <img
              src={
                "https://img.freepik.com/free-vector/camping-with-caravan-illustration_23-2148671151.jpg?t=st=1719940461~exp=1719944061~hmac=cd44c5d77dbbd15763529c53c68fe2ac04a2b679627fa15f3602451ff14e0ea7&w=1380"
              }
              alt={"no-img"}
            />
          )}
        </div>
      </figure>
    </div>
  );
};

export default SiteCard;
