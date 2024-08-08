import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error/Error";
import { addSearchParams } from "../utils/addSearchParams";

const useGetSalePosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [salePosts, setSalePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/sale-posts`;
  const fullUrl = addSearchParams(baseUrl, { keyword, category });

  useEffect(() => {
    const fetchSalePosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(fullUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        setSalePosts(data.salePosts);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalePosts();
  }, [fullUrl]);

  const ErrorComponent = () => <Error error={error} />;

  return { salePosts, isLoading, error, ErrorComponent };
};

export default useGetSalePosts;
