import React, { useState } from "react";
import QuillEditor from "../../components/BlogPost/QuillEditor";
import style from "../../css/Contents/blogPostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { REGION } from "../../constants/market";

const BlogPostWrite = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const MAX_IMAGES = 5;
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.slice(0, MAX_IMAGES - imagePreviews.length);

    setImageFiles(newFiles);

    const filePreviews = newFiles.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePreviews).then((previews) =>
      setImagePreviews((prev) => [...prev, ...previews])
    );
  };
  const handleImageDelete = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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
      <div>
        썸네일 이미지
        <input
          type="file"
          id="file"
          className={style.imgInput}
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={imagePreviews.length >= MAX_IMAGES}
        />
        <label className={style.uploadBtn} htmlFor="file">
          <div>
            <i className="fa-solid fa-camera"></i>
          </div>
        </label>
        <div className={style.imgPreview}>
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`미리보기 ${index + 1}`}
              onClick={() => handleImageDelete(index)}
            />
          ))}
        </div>
      </div>
      <div className={style.inputWrap}>
        <input type="text" placeholder="제목" />

        <RegionDropdown />
        <CityDropdown />
      </div>
      <QuillEditor />
    </section>
  );
};

export default BlogPostWrite;
