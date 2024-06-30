import React, { useState } from "react";
import style from "../../css/MyPage/EditInfo.module.css";
import { useParams } from "react-router-dom";
import { AUTH_ERROR } from "../../constants/errMsg";
import { useSelector } from "react-redux";

// fetch 경로에서 원래는 ${username} 을 써야하는데 현재 로그인 기능 미완으로 하드코딩 하였음.

const url = process.env.REACT_APP_SERVER_URL;
console.log("url 테스트", url);
const EditInfo = () => {
  const [nickname, setNickname] = useState("");
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [checkPW, setCheckPW] = useState("");
  const [errorMsg1, setErrorMsg1] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const [errorMsg3, setErrorMsg3] = useState("");
  const [errorMsg4, setErrorMsg4] = useState("");

  const user = useSelector((state) => state.user.user);
  const userName = user?.username;

  const duplicateCheck = async (e) => {
    e.preventDefault();
    if (!nickname) {
      setErrorMsg1(AUTH_ERROR.BLANK.NICKNAME);
      return;
    }
    const response = await fetch(`${url}/duplicateCheck`, {
      method: "POST",
      body: JSON.stringify({ nickname }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      // 여기서 중복확인 되면 통과한것 관련 효과 추가하자.
      console.log("중복확인 성공");
      setErrorMsg1("");
    } else if (response.status === 409) {
      setErrorMsg1(AUTH_ERROR.DUPLICATE);
    }
  };
  const passwordCheck = async (password) => {
    const response = await fetch(`${url}/passwordCheck/${userName}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log("passwordCheck 성공");
      setErrorMsg2("passwordCheck 성공");
    } else if (response.status === 409) {
      setErrorMsg2(AUTH_ERROR.PASSWORD_CHECK);
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    passwordCheck(currentPW);
    // 이부분에서
    // const pwOK = bcrypt.compareSync(password, userDoc.password); 이 요청 보내면 될듯.
    // response null 이면 setErrorMsg2('현재 비밀번호와 일치하지 않습니다.');
    if (!nickname) {
      setErrorMsg1(AUTH_ERROR.BLANK.NICKNAME);
      return;
    } else if (currentPW === "") {
      setErrorMsg2(AUTH_ERROR.BLANK.CURRENT_PW);
      return;
    } else if (!newPW) {
      setErrorMsg3(AUTH_ERROR.BLANK.NEW_PW);
      return;
    } else if (newPW !== checkPW) {
      setErrorMsg4(AUTH_ERROR.NOT_MATCHING.NEW_PW);
      return;
    } else {
      setErrorMsg1("");
      setErrorMsg2("");
      setErrorMsg3("");
      setErrorMsg4("");
    }

    const response = await fetch(`${url}/editInfo/${userName}`, {
      method: "POST",
      body: JSON.stringify({ username: userName, nickname, password: newPW }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response) {
      console.log("변경완료");
    } else {
      console.log("변경실패");
    }
  };

  return (
    <section className={style.editInfo}>
      <h3 hidden>EditInfo</h3>
      <nav className="myPage_SubHeader">회원정보 수정</nav>
      <form onSubmit={handleSubmit}>
        <label className={style.inputArea}>
          <span className={style.inputContent}>닉네임</span>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <span className={style.errMsg}>{errorMsg1}</span>
          <button
            onClick={(e) => {
              duplicateCheck(e);
            }}
          >
            중복확인
          </button>
        </label>
        <label className={style.inputArea}>
          <span className={style.inputContent}>현재 비밀번호</span>
          <input
            type="password"
            placeholder="현재 비밀번호를 입력해주세요"
            value={currentPW}
            onChange={(e) => setCurrentPW(e.target.value)}
          />
          <span className={style.errMsg}>{errorMsg2}</span>
        </label>
        <span className={style.divider}></span>
        <label className={style.inputArea}>
          <span className={style.inputContent}>변경 비밀번호</span>
          <input
            type="password"
            placeholder="변경할 비밀번호를 입력해주세요"
            value={newPW}
            onChange={(e) => setNewPW(e.target.value)}
          />
          <span className={style.errMsg}>{errorMsg3}</span>
        </label>
        <label className={style.inputArea}>
          <span className={style.inputContent}>변경 비밀번호 확인</span>
          <input
            type="password"
            placeholder="변경한 비밀번호를 한번 더 입력해주세요"
            value={checkPW}
            onChange={(e) => setCheckPW(e.target.value)}
          />
          <span className={style.errMsg}>{errorMsg4}</span>
        </label>
        <button type="submit" className={style.submitBtn}>
          저장하기
        </button>
      </form>
    </section>
  );
};

export default EditInfo;
