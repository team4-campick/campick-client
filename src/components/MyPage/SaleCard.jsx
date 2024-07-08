import { useNavigate } from "react-router-dom";
import style from "./SaleCard.module.css";
import convertToKoreanDate from "../../utils/convertToKoreanDate";
const SaleCard = ({ post }) => {
  const navigate = useNavigate();
  console.log("post data check", post);
  const {
    productName,
    region,
    city,
    price,
    imageUrls,
    createdAt,
    isNegotiable,
  } = post;
  const wonPrice = price?.toLocaleString("ko-KR");
  const thumbnail =
    imageUrls?.[0]?.url ||
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  return (
    <div
      className={style.saleCard}
      onClick={() => {
        navigate(`/sale-post-detail/${post._id}`);
      }}
    >
      <div className={style.imgCon}>
        <img src={thumbnail} alt="상품이미지" />
      </div>
      <div className={style.productInfo}>
        <p className={style.product}>{`${productName}`} 판매합니다.</p>
        <div className={style.priceInfo}>
          <span className={style.price}>{`${wonPrice}`}원</span>
          <span
            className={isNegotiable ? style.negotiable : style.nonNegotiable}
          >
            {isNegotiable ? "협의가능" : "협의불가"}
          </span>
        </div>
        <p className={style.registerInfo}>
          <span className={style.location}>{`${region} ${city} `}</span>
          <span className={style.date}>{convertToKoreanDate(createdAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default SaleCard;
