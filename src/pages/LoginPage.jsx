import style from "../css/LoginPage.module.css";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
const url = process.env.REACT_APP_SERVER_URL;

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
      setMessage2("비밀번호는 8자 이상이어야 합니다.");
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
        const errorData = await response.json();
        if (response.status === 404) {
          setMessage1("사용자가 없습니다.");
        } else if (response.status === 401) {
          setMessage2("비밀번호가 맞지 않습니다.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }
      const data = await response.json();
      if (data.id) {
        setRedirect(true);
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
      setRedirect(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className={style.signin}>
      <div className={style.header}>
        <h2>로그인</h2>
      </div>
      <form className={style.signinFormContainer} onSubmit={login}>
        <input
          type="text"
          className={style.signinInput}
          placeholder="사용자 ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span className={style.signinMessage}>{message1}</span>
        <input
          type="password"
          className={style.signinInput}
          placeholder="패스워드"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className={style.signinMessage}>{message2}</span>
        <button className={style.signinButton} type="submit">
          로그인
        </button>
      </form>
      <p className={style.signinLink}>
        처음이신가요? <Link to="/register">회원가입</Link>
      </p>
    </main>
  );
};

export default LoginPage;
