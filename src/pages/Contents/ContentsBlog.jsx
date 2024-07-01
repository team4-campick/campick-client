import { Link } from "react-router-dom";
import style from "../../css/Contents/contentsBlog.module.css";

import { useNavigate } from "react-router-dom";

const ContentsBlog = () => {
  const navigate = useNavigate();
  return (
    <section class="mw">
      <h2 hidden>ContentsBlog</h2>
      <div className={style.writeBtnCon}>
        <Link to="/blog-post-write" className={style.writeBtn}>
          <span>작성하기</span>
          <i className="fa-regular fa-pen-to-square"></i>
        </Link>
      </div>
      <div className={style.blogPostList}>
        <div
          className={style.blogPostCard}
          onClick={() => {
            navigate(`/blog-post-detail`);
          }}
        >
          <div className={style.blogImg}>
            <img src="" alt="이미지" />
          </div>
          <div className={style.campSiteInfo}>
            <span>캠핑장이름 / </span>
            <span>제주 - </span>
            <span>서귀포</span>
          </div>
          <div>
            <span className={style.postTitle}>title</span>
            <p className={style.postDesc}>
              블로그 내용 요약 들어가는 곳,블로그 내용 요약 들어가는 곳,블로그
              내용 요약 들어가는 곳,블로그 내용 요약 들어가는 곳
            </p>
            <span>writer</span>
          </div>
        </div>
        <div className={style.blogPostCard}>
          <div className={style.blogImg}>
            <img src="" alt="이미지" />
          </div>
          <div className={style.campSiteInfo}>
            <span>캠핑장이름 / </span>
            <span>제주 - </span>
            <span>서귀포</span>
          </div>
          <div>
            <span className={style.postTitle}>title</span>
            <p className={style.postDesc}>
              블로그 내용 요약 들어가는 곳,블로그 내용 요약 들어가는 곳,블로그
              내용 요약 들어가는 곳,블로그 내용 요약 들어가는 곳
            </p>
            <span>writer</span>
          </div>
        </div>
        <div className={style.blogPostCard}>
          <div className={style.blogImg}>
            <img src="" alt="이미지" />
          </div>
          <div className={style.campSiteInfo}>
            <span>캠핑장이름 / </span>
            <span>제주 - </span>
            <span>서귀포</span>
          </div>
          <div>
            <span className={style.postTitle}>title</span>
            <p className={style.postDesc}>
              블로그 내용 요약 들어가는 곳,블로그 내용 요약 들어가는 곳,블로그
              내용 요약 들어가는 곳,블로그 내용 요약 들어가는 곳
            </p>
            <span>writer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentsBlog;
