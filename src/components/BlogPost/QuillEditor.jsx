import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "align",
  "color",
  "background",
  "size",
  "h1",
];

const QuillEditor = () => {
  const [values, setValues] = useState();

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
    };
  }, []);

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setValues}
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};

export default QuillEditor;
