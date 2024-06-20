import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import style from "../css/RegisterPage.module.css"; // 경로 확인

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState(""); // nickname 상태 추가
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("패스워드가 일치하지 않습니다.");
      return;
    }

    //백엔드로 post 요청 및 응답
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({ username, password, nickname }), // nickname 추가
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    if (data.id) {
      setRedirect(true);
    } else {
      setMessage(data.message);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className={`mw ${style.register}`}>
      <h2>회원가입</h2>

      <form onSubmit={register}>
        <input
          type="text"
          placeholder="사용자이름"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname} // nickname input 필드 추가
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="패스워드 확인"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <span>{message}</span>
        <button type="submit">회원가입</button>
      </form>
      <p>
        계정이 있나요? <Link to="/login">로그인</Link>
      </p>
    </main>
  );
};

export default RegisterPage;
