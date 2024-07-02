import { useParams } from "react-router-dom";
import style from "../../css/Contents/blogPostDetail.module.css";
import { useEffect, useState } from "react";
import convertToKoreanDate from "../../utils/convertToKoreanDate";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [blogPostDetail, setBlogPostDetail] = useState({});
  console.log(blogPostDetail);

  const {
    author,
    blogPostTitle,
    campSiteName,
    region,
    city,
    content,
    createdAt,
  } = blogPostDetail;

  console.log(convertToKoreanDate(createdAt));

  const blogPostEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/blog-posts/${id}`;

  const fetchSalePostDetail = async () => {
    try {
      const response = await fetch(blogPostEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }
      setBlogPostDetail(data.blogPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalePostDetail();
  }, [id]);
  return (
    <section>
      <h2 hidden>BlogPostDetail</h2>

      <div className={style.topBackgroundImg}>
        <img src="" alt="배경이미지" />
        <div className={style.blogPostInfo}>
          <h3>{blogPostTitle}</h3>
          <div>
            <span>{campSiteName} </span>
            <span>{region} </span>
            <span>{city}</span>
          </div>
          <div>
            <span>{convertToKoreanDate(createdAt)}</span>
            <span> by. {author}</span>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
};

export default BlogPostDetail;
