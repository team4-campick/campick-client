import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "../../css/Contents/contentsBlog.module.css";
import BlogPostCard from "../../components/BlogPost/BlogPostCard";

const ContentsBlog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = user?.username;
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

  const handleClickSale = () => {
    if (isLoggedIn) {
      navigate("/blog-post-write");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    }
  };

  return (
    <section className={`mw ${style.blogListWrap}`}>
      <h2 hidden>ContentsBlog</h2>
      <div className={style.writeBtnCon}>
        <button
          to="/blog-post-write"
          className={style.writeBtn}
          onClick={handleClickSale}
        >
          <span>작성하기</span>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
      <div className={style.blogPostList}>
        {!blogPosts.length && <p>게시물이 존재하지 않습니다.</p>}
        {blogPosts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default ContentsBlog;
