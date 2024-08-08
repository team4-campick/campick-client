import React, { useState } from "react";
import style from "../../css/MyPage/EditInfo.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AUTH_ERROR } from "../../constants/errMsg";
import { useDispatch, useSelector } from "react-redux";
import { setUserAllInfo } from "../../store/userStore";
import { EDIT_INFO_MSG } from "../../constants/editInfoMsg";

// fetch 경로에서 원래는 ${username} 을 써야하는데 현재 로그인 기능 미완으로 하드코딩 하였음.

const url = process.env.REACT_APP_SERVER_URL;
const EditInfo = () => {
  const [nickname, setNickname] = useState("");
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [checkPW, setCheckPW] = useState("");
  const [errorMsg1, setErrorMsg1] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const [errorMsg3, setErrorMsg3] = useState("");
  const [errorMsg4, setErrorMsg4] = useState("");
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userObjId = user?.id;

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
      setNicknameDuplicateCheck(true);
      setErrorMsg1("사용 가능");
    } else if (response.status === 409) {
      setErrorMsg1(AUTH_ERROR.DUPLICATE);
      setNicknameDuplicateCheck(false);
    }
  };
  const passwordCheck = async (password) => {
    const response = await fetch(`${url}/passwordCheck/${userObjId}`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.result;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("currentPW", currentPW);
    const pwCheckResult = await passwordCheck(currentPW);

    if (nicknameDuplicateCheck === false) {
      setErrorMsg1(AUTH_ERROR.DUPLICATE);
      return;
    }
    if (pwCheckResult === false) {
      setErrorMsg2(AUTH_ERROR.NOT_MATCHING.CURRENT_PW);
      return;
    }
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
    const handleLogout = () => {
      fetch(`${url}/logout`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(setUserAllInfo(null));
      navigate("/");
    };
    const response = await fetch(`${url}/user/${userObjId}`, {
      method: "PUT",
      body: JSON.stringify({ nickname, password: newPW }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response) {
      alert(EDIT_INFO_MSG.SUCCESS);
      handleLogout();
      navigate("/");
    } else {
      alert(EDIT_INFO_MSG.FAIL);
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
          {errorMsg1 !== "사용 가능" ? (
            <span className={style.errMsg}>{errorMsg1}</span>
          ) : (
            <span className={style.passed}>{errorMsg1}</span>
          )}

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
