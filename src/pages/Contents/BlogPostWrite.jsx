import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../../components/BlogPost/QuillEditor";
import style from "../../css/Contents/blogPostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { REGION } from "../../constants/market";
import extractImageUrls from "../../utils/extractImageUrls";
import { checkBlogPostData } from "../../utils/validation";

const BlogPostWrite = () => {
  // 이미지 미리보기 URL을 저장할 상태와 파일을 저장할 상태 선언
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [quillImages, setQuillImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 파일이 변경될 때 호출되는 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 첫 번째 파일만 선택
    if (file) {
      setImageFile(file); // 선택된 파일을 상태에 저장

      const reader = new FileReader(); // FileReader 객체 생성
      reader.onloadend = () => {
        setImagePreview(reader.result); // 파일을 읽은 후 미리보기 URL을 상태에 저장
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기 시작
    }
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = () => {
    setImagePreview(null); // 미리보기 URL 초기화
    setImageFile(null); // 파일 상태 초기화
  };

  const { selectedLabel: region, Dropdown: RegionDropdown } = useDropdown({
    options: REGION,
    type: "도",
  });
  const { selectedLabel: city, Dropdown: CityDropdown } = useDropdown({
    options: REGION.find((option) => option.label === region)?.cities || [],
    type: "시",
  });

  const [blogPostTitle, setBlogPostTitle] = useState("");
  const handleblogPostTitle = (event) => {
    const inputText = event.target.value.slice(0, 20);
    setBlogPostTitle(inputText);
  };
  const [campSiteName, setCampSiteName] = useState("");
  const handlecampSiteName = (event) => {
    setCampSiteName(event.target.value);
  };
  const [blogPostDesc, setBlogPostDesc] = useState("");
  const handleblogPostDesc = (event) => {
    // 글자수 제한 40자
    const inputText = event.target.value.slice(0, 50);
    setBlogPostDesc(inputText);
  };
  const [quillInputValue, setQuillInputValue] = useState("");

  const handleSubmitPost = async () => {
    // Quill 에디터 내에서 존재하는 이미지 URL만 추출
    const imageUrlsInContent = extractImageUrls(quillInputValue);
    const vaildImageUrls = quillImages.filter((image) =>
      imageUrlsInContent.includes(image?.url)
    );
    const newPost = {
      content: quillInputValue,
      region,
      city,
      blogPostTitle,
      campSiteName,
      blogPostDesc,
      imageUrls: vaildImageUrls,
    };

    // 필수값 빠진 항목 없는지 검사
    const isCompleted = checkBlogPostData(newPost);
    if (!isCompleted) return alert("필수 입력 항목을 확인해주세요.");

    setIsLoading(true);

    const formData = new FormData();
    formData.append("newPost", JSON.stringify(newPost));
    formData.append("images", imageFile);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/blog-posts`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }

      alert("게시물 생성에 성공했습니다.");
      navigate(`/blog-post-detail/${res.blogPost._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`mw quillTest ${style.postWriteCon}`}>
      <h2 hidden>BlogPostWrite</h2>
      <div className={style.bgImgWrap}>
        <div>
          <label htmlFor="file" className={style.imgUploadBtn}>
            배경이미지선택
          </label>
          <input
            type="file"
            id="file"
            className={style.imgInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className={style.imgPreview}>
          <img src={imagePreview} alt="" onClick={handleImageDelete} />
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
            onChange={handlecampSiteName}
          />
          <div className={style.selectedRegion}>
            <RegionDropdown />
            <CityDropdown />
          </div>
          <textarea
            placeholder="간단한 소개글을 작성해주세요."
            value={blogPostDesc}
            onChange={handleblogPostDesc}
            rows="3"
          />
        </div>
      </div>

      <QuillEditor
        setValue={setQuillInputValue}
        value={quillInputValue}
        setQuillImages={setQuillImages}
      />

      <div className="submitButtonWrap">
        <div onClick={() => navigate(`/contents/contentsBlog`)}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        <button
          className={`submitButton ${style.blogPostSubmitBtn}`}
          onClick={handleSubmitPost}
          disabled={isLoading}
        >
          {isLoading ? "등록 중" : "등록하기"}
        </button>
      </div>
    </section>
  );
};

export default BlogPostWrite;
