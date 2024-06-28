import style from "./SalePostCard.module.css";
import { useNavigate } from "react-router-dom";

const SalePostCard = ({ post }) => {
  const navigate = useNavigate();
  const { productName, region, city, price, imageUrls } = post;

  const thumbnail =
    imageUrls?.[0]?.url ||
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  return (
    <div
      className={style.salePostCard}
      onClick={() => {
        navigate(`/sale-detail/${post._id}`);
      }}
    >
      <img src={thumbnail} alt='상품이미지' />
      <div className={style.productInfo}>
        <span>{`${region} ${city} `}</span>
        <p>{`${productName}`} 판매합니다.</p>
        <span>{` ${price}`}원</span>
      </div>
    </div>
  );
};

export default SalePostCard;
