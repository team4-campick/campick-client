import React from "react";
import style from "./SiteCard.module.css";
import { useNavigate } from "react-router-dom";

const SiteCard = ({ site }) => {
  const navigate = useNavigate();
  const { doNm, sigunguNm, firstImageUrl, facltNm, contentId, induty } = site;
  const facltNmArr = facltNm.split(" ");
  const filterdFacltNm = [];
  facltNmArr.map((e) => {
    if (facltNmArr.length === 1) {
      return filterdFacltNm.push(e);
    }
    if (e.includes("(")) {
      e.split();
      const newE = e.slice(0, e.indexOf("("));
      return filterdFacltNm.push(newE);
    }
    if (e !== "충주") {
      return filterdFacltNm.push(e);
    }
  });
  return (
    <div
      className={style.siteCard}
      key={contentId}
      onClick={() => {
        navigate(`/site-detail/${contentId}`, { state: site });
      }}
    >
      <figure>
        <figcaption>
          <span className={style.facltNm}>{filterdFacltNm[0]}</span>

          <p className={style.info}>
            <span className={style.induty}>{induty}</span>
            <span className={style.location}>{`${doNm} ${sigunguNm}`}</span>
          </p>

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
