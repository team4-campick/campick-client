import style from "../css/RegisterPage.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
const url = process.env.REACT_APP_SERVER_URL;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // isLoggedIn 상태 정의

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

    try {
      const loginDate = new Date().toISOString();
      console.log(loginDate);

      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password, loginDate }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.id) {
        setRedirect(true);
        setIsLoggedIn(true);
      } else {
        if (data.message === "nouser") {
          setMessage1("사용자가 없습니다.");
        }
        if (data.message === "failed") {
          setMessage2("비밀번호가 맞지 않습니다.");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage1("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${url}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsLoggedIn(false);
      setRedirect(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className={`mw ${style.register}`}>
      <h2>SIGN IN</h2>

      {isLoggedIn ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="사용자이름(ID)"
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
          <button type="submit">SIGN IN</button>
        </form>
      )}
      <p>
        계정이 없으신가요? <Link to="/register">REGISTER</Link>
      </p>
    </main>
  );
};

export default LoginPage;
