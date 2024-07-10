import React, { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./QuillEditor.module.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const QuillEditor = ({ value, setValue, setQuillImages }) => {
  const quillRef = useRef(null);

  const handleUploadImage = async () => {
    try {
      // input 생성
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.setAttribute("multiple", true);
      input.click();

      // input에 이미지 추가
      input.onchange = async () => {
        const formData = new FormData();
        const { files } = input;

        [...files].forEach((file) => {
          formData.append("images", file);
        });

        // 이미지 업로드
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/blog-posts/upload-images`,
          {
            method: "POST",
            body: formData,
          }
        );

        const res = await response.json();

        if (!res.result) return alert(res.message);

        // 반환된 이미지 url을 에디터에 추가
        const imageData = res.imageUrls;
        const validImageData = [...imageData].filter((image) => image);
        if (validImageData.length === 0)
          return alert("이미지 첨부에 실패했습니다. 용량을 확인해주세요.");

        setQuillImages((prev) => [...prev, ...validImageData]);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        for (const imageUrl of validImageData) {
          quill.insertEmbed(range.index, "image", imageUrl.url);
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }], // font size
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // headers
          [{ font: [] }], // font family
          [{ align: [] }], // text align
          ["bold", "italic", "underline", "strike"], // formatting buttons
          [{ list: "ordered" }, { list: "bullet" }], // lists
          [{ indent: "-1" }, { indent: "+1" }], // indent/outdent
          [{ direction: "rtl" }], // text direction
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image", "video"], // insert link, image, video
          ["clean"], // remove formatting button
        ],
        handlers: {
          image: handleUploadImage,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  return (
    <div className={style.editorWrap}>
      <ReactQuill
        theme="snow"
        ref={quillRef}
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        placeholder="내용을 입력해주세요."
        style={{ all: "revert" }}
      />
    </div>
  );
};

export default QuillEditor;
