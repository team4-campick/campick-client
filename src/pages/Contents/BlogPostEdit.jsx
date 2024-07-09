import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuillEditor from "../../components/BlogPost/QuillEditor";
import style from "../../css/Contents/blogPostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { REGION } from "../../constants/market";
import extractImageUrls from "../../utils/extractImageUrls";
import { checkBlogPostData } from "../../utils/validation";

const BlogPostEdit = () => {
  const [quillImages, setQuillImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState([
    {
      _id: "",
      url: "",
      publicId: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [isFetched, setIsFetched] = useState(false);

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

  const [blogPostTitle, setBlogPostTitle] = useState("");
  const handleblogPostTitle = (event) => {
    const inputText = event.target.value.slice(0, 20);
    setBlogPostTitle(inputText);
  };
  const [campSiteName, setCampSiteName] = useState("");

  const handleCampSiteName = (event) => {
    setCampSiteName(event.target.value);
  };

  const [blogPostDesc, setBlogPostDesc] = useState("");

  const handleblogPostDesc = (event) => {
    const inputText = event.target.value.slice(0, 50);
    setBlogPostDesc(inputText);
  };

  const [quillInputValue, setQuillInputValue] = useState("");

  const fetchBlogPostEdit = async () => {
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

      setBlogPostTitle(data.blogPost.blogPostTitle);
      setQuillInputValue(data.blogPost.content);
      setRegion(data.blogPost.region);
      setCity(data.blogPost.city);
      setCampSiteName(data.blogPost.campSiteName);
      setBlogPostDesc(data.blogPost.blogPostDesc);
      setBackgroundImage(data.blogPost.backgroundImgUrls);
      setIsFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogPostEdit();
  }, []);

  const handleSubmitPost = async () => {
    const imageUrlsInContent = extractImageUrls(quillInputValue);
    const vaildImageUrls = quillImages.filter((image) =>
      imageUrlsInContent.includes(image?.url)
    );
    const editedPost = {
      content: quillInputValue,
      region,
      city,
      blogPostTitle,
      campSiteName,
      blogPostDesc,
      imageUrls: vaildImageUrls,
    };

    // 필수값 빠진 항목 없는지 검사
    const isCompleted = checkBlogPostData(editedPost);
    if (!isCompleted) return alert("필수 입력 항목을 확인해주세요.");

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/blog-posts/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(editedPost),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }

      alert("게시물 수정에 성공했습니다.");
      navigate(`/blog-post-detail/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터가 불러와지기 전에는 Loading 표시
  if (!isFetched) return <p>Loading...</p>;

  return (
    <section className={`mw quillTest ${style.postWriteCon}`}>
      <h2 hidden>BlogPostEdit</h2>

      <div className={style.bgImgWrap}>
        <div className={style.imgPreview}>
          {/* 배경이미지가 있을 경우에만 노출 */}
          {!!backgroundImage.length && (
            <img
              key={backgroundImage[0]._id}
              src={backgroundImage[0].url}
              alt="배경이미지"
            />
          )}
        </div>

        <div className={style.inputWrap}>
          <input
            type="text"
            placeholder="글의 제목을 입력해주세요."
            value={blogPostTitle}
            onChange={handleblogPostTitle}
          />

          <input
            type="text"
            placeholder="장소를 입력해주세요."
            value={campSiteName}
            onChange={handleCampSiteName}
          />
          <div className={style.selectedRegion}>
            <RegionDropdown />
            <CityDropdown />
          </div>
          <textarea
            type="text"
            placeholder="간단한 소개글을 작성해주세요."
            value={blogPostDesc}
            onChange={handleblogPostDesc}
            rows="3"
          />
        </div>
      </div>

      <QuillEditor
        value={quillInputValue}
        setValue={setQuillInputValue}
        setQuillImages={setQuillImages}
      />

      <div className="submitButtonWrap">
        <div
          onClick={() => {
            navigate(`/blog-post-detail/${id}`);
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        <button
          className={`submitButton ${style.blogPostEditBtn}`}
          type="button"
          onClick={handleSubmitPost}
          disabled={isLoading}
        >
          {isLoading ? "수정 중" : "등록하기"}
        </button>
      </div>
    </section>
  );
};

export default BlogPostEdit;
