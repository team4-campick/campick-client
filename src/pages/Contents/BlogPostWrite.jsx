import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuillEditor from "../../components/BlogPost/QuillEditor";
import style from "../../css/Contents/blogPostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { REGION } from "../../constants/market";

const BlogPostWrite = () => {
  // 이미지 미리보기 URL을 저장할 상태와 파일을 저장할 상태 선언
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
          <input type="text" placeholder="글의 제목을 입력해주세요." />

          <input type="text" placeholder="장소를 입력해주세요." />
          <div className={style.selectedRegion}>
            <RegionDropdown />
            <CityDropdown />
          </div>
        </div>
      </div>
      <QuillEditor />

      <div className="submitButtonWrap">
        <Link to="/contents">
          <i className="fa-solid fa-chevron-left"></i>
        </Link>
        <Link to="/blog-post/:id">
          <button className="submitButton">작성하기</button>
        </Link>
      </div>
    </section>
  );
};

export default BlogPostWrite;
