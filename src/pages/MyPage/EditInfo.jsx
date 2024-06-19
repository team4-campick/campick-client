import React from 'react';
import style from '../../css/MyPage/EditInfo.module.css';

const EditInfo = () => {
  return (
    <section className={style.editInfo}>
      <h3 hidden>EditInfo</h3>
      <nav className="myPage_SubHeader">회원정보 수정</nav>
      <form>
        <label className={style.inputArea}>
          <span className={style.inputContent}>닉네임</span>
          <input type="text" placeholder="닉네임을 입력해주세요" />
          <span className={style.errMsg}>errorMsg</span>
          <button>중복확인</button>
        </label>
        <label className={style.inputArea}>
          <span className={style.inputContent}>현재 비밀번호</span>
          <input type="password" placeholder="현재 비밀번호를 입력해주세요" />
          <span className={style.errMsg}>errorMsg</span>
        </label>
        <span className={style.divider}></span>
        <label className={style.inputArea}>
          <span className={style.inputContent}>변경 비밀번호</span>
          <input type="password" placeholder="변경할 비밀번호를 입력해주세요" />
          <span className={style.errMsg}>errorMsg</span>
        </label>
        <label className={style.inputArea}>
          <span className={style.inputContent}>변경 비밀번호 확인</span>
          <input
            type="password"
            placeholder="변경한 비밀번호를 한번 더 입력해주세요"
          />
          <span className={style.errMsg}>errorMsg</span>
        </label>
        <button className={style.submitBtn}>저장하기</button>
      </form>
    </section>
  );
};

export default EditInfo;
