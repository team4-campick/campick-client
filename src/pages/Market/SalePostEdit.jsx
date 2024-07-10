import style from "../../css/Market/SalePostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import {
  PRODUCT_CATEGORY,
  REGION,
  PRODUCT_CONDITION_OPTIONS,
  SALE_STATUS,
} from "../../constants/market";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { checkMarketPostData } from "../../utils/validation";

const SalePostEdit = () => {
  const { id } = useParams();

  const salePostsEndpoint = `${process.env.REACT_APP_SERVER_URL}/api/sale-posts/${id}`;

  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isFetched, setIsFetched] = useState(false);

  // useDropdown 훅을 통해 드롭다운 컴포넌트 및 선택값을 필요한 값(카테고리, 지역 등)에 따라 분리하여 관리
  const {
    selectedLabel: category,
    setSelectedLabel: setCategory,
    Dropdown: CategoryDropdown,
  } = useDropdown({
    options: PRODUCT_CATEGORY,
    type: "종류",
  });
  const {
    selectedLabel: region,
    setSelectedLabel: setRegion,
    Dropdown: RegionDropdown,
  } = useDropdown({
    options: REGION,
    type: "도",
  });
  const {
    selectedLabel: city,
    setSelectedLabel: setCity,
    Dropdown: CityDropdown,
  } = useDropdown({
    options: REGION.find((option) => option.label === region)?.cities || [],
    type: "시",
  });

  const {
    selectedLabel: salesStatus,
    setSelectedLabel: setSalesStatus,
    Dropdown: StatusDropdown,
  } = useDropdown({
    options: SALE_STATUS,
    type: "판매중",
  });
  const [productName, setProductName] = useState("");
  const handleProductName = (event) => {
    setProductName(event.target.value);
  };

  const [condition, setCondition] = useState(
    PRODUCT_CONDITION_OPTIONS[0].label
  );
  const handleCondition = (event) => {
    setCondition(event.target.value);
  };

  const [isNegotiable, setIsNegotiable] = useState(false);
  const handleIsNegotiable = (event) => {
    setIsNegotiable(event.target.checked);
  };

  const [price, setPrice] = useState("");
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const [desc, setDesc] = useState("");
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const fetchSalePostEdit = async () => {
    try {
      const response = await fetch(salePostsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.result) {
        return alert(data.message);
      }
      //   setSalePostEdit(data.salePost);
      setProductName(data.salePost.productName);
      setPrice(data.salePost.price);
      setDesc(data.salePost.desc);
      setCondition(data.salePost.condition);
      setIsNegotiable(data.salePost.isNegotiable);
      setCategory(data.salePost.category);
      setRegion(data.salePost.region);
      setCity(data.salePost.city);
      setImageFiles(data.salePost.imageUrls);
      setSalesStatus(data.salePost.salesStatus);
      setIsFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalePostEdit();
  }, []);

  const handleSubmitPost = async () => {
    const editedPost = {
      category,
      productName,
      region,
      city,
      price,
      desc,
      condition,
      isNegotiable,
      salesStatus,
    };

    const isCompleted = checkMarketPostData(editedPost);
    if (!isCompleted) return alert("필수 입력 항목을 확인해주세요.");

    setIsLoading(true);

    try {
      const response = await fetch(salePostsEndpoint, {
        method: "PUT",
        body: JSON.stringify(editedPost),
        headers: {
          "Content-type": "application/json",
        },
      });

      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }

      alert("게시물 수정에 성공했습니다.");
      navigate(`/sale-post-detail/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터가 불러와지기 전에는 Loading 표시
  if (!isFetched) return <p>Loading...</p>;

  return (
    <section className={`mw ${style.writeCon}`}>
      <h2 hidden>SalePostWrite</h2>
      <div>
        <ul>
          <li>
            <span>상품 사진</span>
            <div className={style.imgPreview}>
              {imageFiles.map((image, index) => {
                return (
                  <img
                    key={image._id}
                    src={image.url}
                    alt={`상품이미지 ${index + 1}`}
                  />
                );
              })}
            </div>
          </li>
          <li>
            <span>상품 종류</span>
            <CategoryDropdown />
          </li>
          <li>
            <span>상품 이름</span>
            <input
              type="text"
              placeholder="상품명을 입력해주세요."
              value={productName}
              onChange={handleProductName}
            />
          </li>
          <li>
            <span>거래 지역</span>
            <div className={style.selectRegion}>
              <RegionDropdown />
              <CityDropdown />
            </div>
          </li>
          <li>
            <span>상품 상태</span>

            {PRODUCT_CONDITION_OPTIONS.map((option, idx) => {
              const { value, label } = option;
              return (
                <React.Fragment key={value}>
                  <label className={style.productCondition}>
                    <input
                      type="radio"
                      id={label}
                      name="condition"
                      value={label}
                      onChange={handleCondition}
                      checked={condition === label}
                    />
                    {label}
                  </label>
                </React.Fragment>
              );
            })}
          </li>
          <li>
            <span>판매 가격</span>
            <input
              type="text"
              placeholder="가격을 입력해 주세요."
              value={price}
              onChange={handlePrice}
            />
            원
            <div className={style.priceNegotiable}>
              <label>
                <input
                  type="checkbox"
                  id="negotiablePrice"
                  name="negotiablePrice"
                  onChange={handleIsNegotiable}
                  checked={isNegotiable}
                />
                가격협의가능
              </label>
            </div>
          </li>
          <li>
            <span>상품 설명</span>
            <textarea
              name=""
              id=""
              value={desc}
              onChange={handleDesc}
              className={style.productDesc}
              rows="15"
            ></textarea>
          </li>
          <li>
            <span>판매 상태</span>
            <StatusDropdown />
          </li>
        </ul>
        <div className="submitButtonWrap">
          <div
            onClick={() => {
              navigate(`/sale-post-detail/${id}`);
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>

          <button
            className={`submitButton ${style.salePostEditBtn}`}
            type="button"
            onClick={handleSubmitPost}
            disabled={isLoading}
          >
            {isLoading ? "수정 중" : "등록하기"}
          </button>
        </div>
      </div>
    </section>
  );
};
export default SalePostEdit;
