import style from "./SalePostCard.module.css";
import { useNavigate } from "react-router-dom";

const SalePostCard = ({ post }) => {
  const navigate = useNavigate();
  const { productName, region, city, price } = post;
  return (
    <div
      className={style.salePostCard}
      onClick={() => {
        navigate(`/sale-detail`);
        // navigate(`/sale-detail/${post._id}`);
      }}
    >
      <img src="" alt="물품이미지" />
      <div className={style.productInfo}>
        <span>{`${region} ${city} `}</span>
        <p>{`${productName}`} 판매합니다.</p>
        <span>{` ${price}`}원</span>
      </div>
    </div>
  );
};

export default SalePostCard;
