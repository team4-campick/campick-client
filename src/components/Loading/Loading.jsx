import React from "react";
import style from "./Loading.module.css";
import loading from "../../assets/loading/loading.gif";
const Loading = () => {
  return (
    <div className={style.background}>
      <div className={style.loadingText}>잠시만 기다려 주세요.</div>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
