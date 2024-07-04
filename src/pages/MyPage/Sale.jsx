import React, { useEffect, useState } from "react";
import style from "../../css/MyPage/Transaction.module.css";
import SaleCard from "../../components/MyPage/SaleCard";

const Sale = () => {
  const url = process.env.REACT_APP_SERVER_URL;
  const [salePosts, setSalePosts] = useState([]);

  const getSalePostList = async () => {
    try {
      const response = await fetch(`${url}/api/sale-posts`);
      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }

      setSalePosts(data.salePosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSalePostList();
  }, []);
  return (
    <section className={style.cardCon}>
      <h3 hidden>Sale</h3>
      <div className={style.cardList}>
        {salePosts.map((post) => (
          <SaleCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Sale;
