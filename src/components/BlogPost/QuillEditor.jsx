import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
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

const QuillEditor = ({ value, setValue }) => {
  // const [values, setValues] = useState();

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }], // font size
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // headers
          [{ font: [] }], // font family
          [{ align: [] }], // text align
          ["bold", "italic", "underline", "strike"], // formatting buttons
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ list: "ordered" }, { list: "bullet" }], // lists
          [{ indent: "-1" }, { indent: "+1" }], // indent/outdent
          [{ direction: "rtl" }], // text direction
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image", "video"], // insert link, image, video
          ["clean"], // remove formatting button
        ],
      },
    };
  }, []);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
      placeholder="내용을 입력해주세요."
    />
  );
};

export default QuillEditor;
