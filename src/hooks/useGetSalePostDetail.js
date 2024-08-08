import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error/Error";

const useGetSalePostDetail = () => {
  const { id } = useParams();
  const [salePostDetail, setSalePostDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalePostDetail = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/sale-posts/${id}`,
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

        setSalePostDetail(data.salePost);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalePostDetail();
  }, [id]);

  const ErrorComponent = () => <Error error={error} />;

  return { salePostDetail, isLoading, error, ErrorComponent };
};

export default useGetSalePostDetail;
