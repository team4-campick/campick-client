import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import style from "../css/RegisterPage.module.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const url = process.env.REACT_APP_SERVER_URL;

  const register = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
      setMessage("아이디는 4자 이상이어야 하며 영어로 시작해야 합니다.");
      return;
    } else {
      setMessage("");
    }
    if (password.length < 8) {
      setMessage("패스워드는 8자 이상이어야 합니다.");
      return;
    } else {
      setMessage("");
    }
    if (password !== password2) {
      setMessage("패스워드가 일치하지 않습니다.");
      return;
    } else {
      setMessage("");
    }

    //백엔드로 post 요청 및 응답
    try {
      const response = await fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          nickname,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log("test1", response.message);
      const data = await response.json();
      console.log("test2", data.user.username);

      if (data.user.username) {
        setRedirect(true);
      } else {
        setMessage(data.message);
      }
      console.log(redirect);
      if (redirect) {
        return <Navigate to="/" />;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/signin" />;
  }

  return (
    <main className={`mw ${style.register}`}>
      <h2 className={style.registerH2}>회원가입</h2>
      <form className={style.registerForm} onSubmit={register}>
        <input
          type="text"
          className={style.registerInput}
          placeholder="사용자 ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className={style.registerInput}
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="password"
          className={style.registerInput}
          placeholder="패스워드"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className={style.registerInput}
          placeholder="패스워드 확인"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <span className={style.registerSpan}>{message}</span>
        <button type="submit" className={style.registerButton}>
          회원가입
        </button>
      </form>
      <p className={style.registerLink}>
        계정이 있나요? <Link to="/signin">로그인</Link>
      </p>
    </main>
  );
};

export default RegisterPage;
