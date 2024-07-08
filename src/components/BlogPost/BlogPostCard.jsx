import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./BlogPostCard.module.css";

const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();
  const {
    author,
    campSiteName,
    blogPostTitle,
    region,
    city,
    blogPostDesc,
    backgroundImgUrls,
  } = post;
  const thumbnail =
    backgroundImgUrls?.[0]?.url ||
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  return (
    <div
      className={style.blogPostCard}
      onClick={() => {
        navigate(`/blog-post-detail/${post._id}`);
      }}
    >
      <div className={style.postCardImg}>
        <img src={thumbnail} alt="배경이미지" />
      </div>
      <div className={style.postCardInfoCon}>
        <div className={style.campSiteInfo}>
          <span>{`${campSiteName}`} &middot; </span>
          <span>{`${region}`} </span>
          <span>{`${city}`}</span>
        </div>
        <h3 className={style.postTitle}>{`${blogPostTitle}`}</h3>
        <div className={style.postDesc}>{`${blogPostDesc}`}</div>
        <div className={style.author}>by.{`${author}`}</div>
      </div>
    </div>
  );
};

export default BlogPostCard;
