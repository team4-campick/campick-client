import React from "react";
import { useNavigate } from "react-router-dom";

const Error = ({ error }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2>에러가 발생했습니다.</h2>
      {error.message && <p>{error.message}</p>}
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </>
  );
};

export default Error;
