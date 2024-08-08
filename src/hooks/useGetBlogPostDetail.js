import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error/Error";

const useGetBlogPostDetail = () => {
  const { id } = useParams();
  const [blogPostDetail, setBlogPostDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPostDetail = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/blog-posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!data.result) {
          return alert(data.message);
        }

        setBlogPostDetail(data.blogPost);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPostDetail();
  }, [id]);

  const ErrorComponent = () => <Error error={error} />;

  return { blogPostDetail, isLoading, error, ErrorComponent };
};

export default useGetBlogPostDetail;
