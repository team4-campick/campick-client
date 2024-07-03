import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuillEditor from "../../components/BlogPost/QuillEditor";
import style from "../../css/Contents/blogPostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { REGION } from "../../constants/market";

const BlogPostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    setBlogPostTitle(event.target.value);
  };
  const [campSiteName, setCampSiteName] = useState("");

  const handleCampSiteName = (event) => {
    setCampSiteName(event.target.value);
  };

  const [blogPostDesc, setBlogPostDesc] = useState("");

  const handleblogPostDesc = (event) => {
    setBlogPostDesc(event.target.value);
  };

  const [quillInputValue, setQuillInputValue] = useState("");
  console.log(quillInputValue);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogPostEdit();
  }, []);

  const handleSubmitPost = async () => {
    const editedPost = {
      content: quillInputValue,
      region,
      city,
      blogPostTitle,
      campSiteName,
      blogPostDesc,
    };

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
      navigate(`/blog-post-detail/${res.blogPost._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={`mw ${style.postWriteCon}`}>
      <h2 hidden>BlogPostEdit</h2>

      <div className={style.bgImgWrap}>
        {/* <div>
          <input
            type="file"
            id="file"
            className={style.imgInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div> */}

        <div className={style.imgPreview}>
          {/* <img
            src={imagePreview}
            alt="배경이미지"
            onClick={handleImageDelete}
          /> */}
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
          <input
            type="text"
            placeholder="소개글을 작성해주세요."
            value={blogPostDesc}
            onChange={handleblogPostDesc}
          />
        </div>
      </div>

      <QuillEditor
        value={quillInputValue}
        setValue={setQuillInputValue}
        // onChange={handlecontent}
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
          className="submitButton"
          type="button"
          onClick={handleSubmitPost}
        >
          수정하기
        </button>
      </div>
    </section>
  );
};

export default BlogPostEdit;
