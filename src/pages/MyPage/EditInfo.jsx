import React, { useState } from 'react';
import style from '../../css/MyPage/EditInfo.module.css';

const url = 'http://localhost:8000';
const EditInfo = () => {
  const [nickname, setNickname] = useState('');
  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [checkPW, setCheckPW] = useState('');

  const duplicateCheck = async () => {
    const response = await fetch(`${url}/duplicateCheck`, {
      method: 'POST',
      body: JSON.stringify({
        nickname,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status === 200) {
      console.log('중복확인 성공');
    } else if (response.status === 409) {
      alert('이미 존재하는 닉네임입니다.');
    }
  };

  return (
    <section className={style.editInfo}>
      <h3 hidden>EditInfo</h3>
      <nav className="myPage_SubHeader">회원정보 수정</nav>
      <form>
        <label className={style.inputArea}>
          <span className={style.inputContent}>닉네임</span>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <span className={style.errMsg}>errorMsg</span>
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
            required
          />
          <span className={style.errMsg}>errorMsg</span>
        </label>
        <span className={style.divider}></span>
        <label className={style.inputArea}>
          <span className={style.inputContent}>변경 비밀번호</span>
          <input
            type="password"
            placeholder="변경할 비밀번호를 입력해주세요"
            value={newPW}
            onChange={(e) => setNewPW(e.target.value)}
            required
          />
          <span className={style.errMsg}>errorMsg</span>
        </label>
        <label className={style.inputArea}>
          <span className={style.inputContent}>변경 비밀번호 확인</span>
          <input
            type="password"
            placeholder="변경한 비밀번호를 한번 더 입력해주세요"
            value={checkPW}
            onChange={(e) => setCheckPW(e.target.value)}
            required
          />
          <span className={style.errMsg}>errorMsg</span>
        </label>
        <button className={style.submitBtn}>저장하기</button>
      </form>
    </section>
  );
};

export default EditInfo;
