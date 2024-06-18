import React, { useState } from 'react';
import style from '../../css/MyPage/CustomerService.module.css';

const CustomerService = () => {
  const [policyCheck, setPolicyCheck] = useState(false);

  const checkBoxStatus = () => setPolicyCheck(!policyCheck);
  const deleteUser = async (e) => {
    e.preventDefault();
  };
  return (
    <section className={style.CustomerService}>
      <h3 hidden>CustomerService</h3>
      <nav className="MyPage_SubHeader">고객 지원</nav>
      <form>
        <label className={style.InputArea}>
          <span>문의사항</span>
          <input type="text" placeholder="제목" />
          <input
            type="email"
            pattern=".+@example\.com"
            placeholder="답변 받으실 이메일"
          />
          <textarea name="" id="" placeholder="문의사항"></textarea>
          <button>문의하기</button>
        </label>
      </form>
      <form>
        <label className={style.InputArea}>
          <span>회원 탈퇴</span>
          <p className={style.Policy}>
            회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보는
            <br />
            <u>개인정보처리방침</u>에 따라 60일간 보관&#40;잠김&#41;되며, 60일
            경과된 후에는 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수
            없게 됩니다.
            <br />
            작성된 게시물은 삭제되지 않으며, 익명처리 후 Campick으로 소유권이
            귀속됩니다.
          </p>
          <input
            type="checkbox"
            className="PolicyCheck"
            onChange={() => checkBoxStatus()}
          />
          <span>회원 탈퇴에 관한 정책을 읽고 이에 동의합니다.</span>
          <button disabled={!policyCheck} onClick={(e) => deleteUser(e)}>
            탈퇴하기
          </button>
        </label>
      </form>
    </section>
  );
};

export default CustomerService;
