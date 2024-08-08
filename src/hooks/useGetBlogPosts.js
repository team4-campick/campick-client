import { useState, useEffect } from "react";
import Error from "../components/Error/Error";

const useGetBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);

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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const ErrorComponent = () => <Error error={error} />;

  return { blogPosts, isLoading, error, ErrorComponent };
};

export default useGetBlogPosts;
