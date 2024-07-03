import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../../css/Contents/contentsBlog.module.css";

const ContentsBlog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/blog-posts`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setBlogPosts(data.blogPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="mw">
      <h2 hidden>ContentsBlog</h2>
      <div className={style.writeBtnCon}>
        <Link to="/blog-post-write" className={style.writeBtn}>
          <span>작성하기</span>
          <i className="fa-regular fa-pen-to-square"></i>
        </Link>
      </div>
      <div className={style.blogPostList}>
        {!blogPosts.length && <p>게시물이 존재하지 않습니다.</p>}
        {blogPosts.map((post) => {
          const {
            author,
            campSiteName,
            blogPostTitle,
            region,
            city,
            blogPostDesc,
          } = post;
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
        })}
      </div>
    </section>
  );
};

export default ContentsBlog;
