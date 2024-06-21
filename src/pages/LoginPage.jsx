import style from "../css/RegisterPage.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [redirect, setRedirect] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    console.log(username, password);

    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
      setMessage1("아이디는 4자 이상이어야 하며 영어로 시작해야 합니다.");
      return;
    } else {
      setMessage1("");
    }
    if (password.length < 8) {
      setMessage2("8자 이상이어야 합니다.");
      return;
    } else {
      setMessage2("");
    }

    const loginDate = new Date().toISOString();

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ username, password, loginDate }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    if (data.id) {
      setRedirect(true);
    }
    if (data.message === "nouser") {
      setMessage1("사용자가 없습니다.");
    }
    if (data.message === "failed") {
      setMessage2("비밀번호가 맞지 않습니다.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className={`mw ${style.register}`}>
      <h2>로그인</h2>

      <form onSubmit={login}>
        <input
          type="text"
          placeholder="사용자이름"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <span>{message1}</span>
        <input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span>{message2}</span>
        <button type="submit">로그인</button>
      </form>
      <p>
        계정이 없나요? <Link to="/register">회원가입</Link>
      </p>
    </main>
  );
};

export default LoginPage;