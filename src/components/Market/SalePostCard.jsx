import style from "./SalePostCard.module.css";
import { useNavigate } from "react-router-dom";
import convertToKoreanDate from "../../utils/convertToKoreanDate";

const SalePostCard = ({ post }) => {
  const navigate = useNavigate();
  const {
    productName,
    category,
    region,
    city,
    price,
    imageUrls,
    isNegotiable,
    createdAt,
  } = post;

  const thumbnail =
    imageUrls?.[0]?.url ||
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  return (
    <div
      className={style.salePostCard}
      onClick={() => {
        navigate(`/sale-post-detail/${post._id}`);
      }}
    >
      <div className={style.thumnailImg}>
        <img src={thumbnail} alt="상품이미지" />
      </div>
      <div className={style.productInfo}>
        <div>
          <span className={style.regionCity}>
            {region} {city} &middot;
          </span>
          <span className={style.productCategory}> {category}</span>
          <p>{productName} 판매합니다.</p>
        </div>
        <div className={style.priceWrap}>
          <span>{price && `${price.toLocaleString("ko-KR")}원`}</span>
          <div
            className={isNegotiable ? style.negotiable : style.nonNegotiable}
          >
            {isNegotiable ? "협의가능" : "협의불가"}
          </div>
        </div>

        <div className={style.writeDate}>{convertToKoreanDate(createdAt)}</div>
      </div>
    </div>
  );
};

export default SalePostCard;
