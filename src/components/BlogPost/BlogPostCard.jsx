import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../../css/Contents/contentsBlog.module.css";

const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();
  const { author, campSiteName, blogPostTitle, region, city, blogPostDesc } =
    post;
  return (
    <div
      className={style.blogPostCard}
      onClick={() => {
        navigate(`/blog-post-detail/${post._id}`);
      }}
    >
      <div className={style.blogImg}>
        <img src="" alt="이미지" />
      </div>
      <div>
        <div className={style.campSiteInfo}>
          <span>{`${campSiteName}`} &middot; </span>
          <span>{`${region}`} </span>
          <span>{`${city}`}</span>
        </div>
        <h3 className={style.postTitle}>{`${blogPostTitle}`}</h3>
        <div>{`${blogPostDesc}`}</div>
        <div className={style.author}>by.{`${author}`}</div>
      </div>
    </div>
  );
};

export default BlogPostCard;
