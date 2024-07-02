import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuillEditor from "../../components/BlogPost/QuillEditor";
import style from "../../css/Contents/blogPostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { REGION } from "../../constants/market";

const BlogPostWrite = () => {
  // 이미지 미리보기 URL을 저장할 상태와 파일을 저장할 상태 선언
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
    setBlogPostTitle(event.target.value);
  };
  const [campSiteName, setCampSiteName] = useState("");
  const handlecampSiteName = (event) => {
    setCampSiteName(event.target.value);
  };
  const [blogPostDesc, setBlogPostDesc] = useState("");
  const handleblogPostDesc = (event) => {
    setBlogPostDesc(event.target.value);
  };
  const [quillInputValue, setQuillInputValue] = useState("");
  console.log(quillInputValue);

  const handleSubmitPost = async () => {
    const newPost = {
      content: quillInputValue,
      region,
      city,
      blogPostTitle,
      campSiteName,
      blogPostDesc,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/blog-posts`,
        {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: {
            "Content-type": "application/json",
          },
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
    }
  };

  return (
    <section className={`mw ${style.postWriteCon}`}>
      <h2 hidden>BlogPostWrite</h2>

      <div className={style.bgImgWrap}>
        <div>
          <input
            type="file"
            id="file"
            className={style.imgInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className={style.imgPreview}>
          <img
            src={imagePreview}
            alt="배경이미지"
            onClick={handleImageDelete}
          />
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
          <input
            type="text"
            placeholder="소개글을 작성해주세요."
            value={blogPostDesc}
            onChange={handleblogPostDesc}
          />
        </div>
      </div>

      <QuillEditor setValue={setQuillInputValue} />

      <div className="submitButtonWrap">
        <Link to="/contents">
          <i className="fa-solid fa-chevron-left"></i>
        </Link>

        <button
          className="submitButton"
          type="button"
          onClick={handleSubmitPost}
        >
          작성완료
        </button>
      </div>
    </section>
  );
};

export default BlogPostWrite;
