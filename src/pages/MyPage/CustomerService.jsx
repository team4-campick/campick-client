import React, { useState } from 'react';
import style from '../../css/MyPage/CustomerService.module.css';

const url = 'http://localhost:8000'; // 테스트용 store에 ref 로 올려야할 부분
const CustomerService = () => {
  const [policyCheckStatus, setPolicyCheckStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const checkBoxStatus = () => setPolicyCheckStatus(!policyCheckStatus);
  // ===========================백엔드 API 연결 진행하다가 잠=======================
  const inquiry = async (e) => {
    const response = await fetch(`${url}/inquiry`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        email,
        content,
      }),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
    console.log(response);
  };
  // ======================================================================
  const deleteUser = async (e) => {
    e.preventDefault();
    console.log('deleteBtn clicked');
    const response = await fetch(`${url}/deleteUser/:nickname`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
  };
  return (
    <section className={style.customerService}>
      <h3 hidden>CustomerService</h3>
      <nav className="myPage_SubHeader">고객 지원</nav>
      <form onSubmit={inquiry}>
        <div className={style.testArea}>
          <span>문의사항</span>
          <span className={style.divider}></span>
        </div>
        <label className={style.inputArea}>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            // pattern=".+@example\.com"git
            placeholder="답변 받으실 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            name="inquiryContent"
            id="inquiryContent"
            placeholder="문의사항"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            {content}
          </textarea>

          <button className={style.inquiryBtn} type="submit">
            문의하기
          </button>
        </label>
      </form>
      <form>
        <div className={style.testArea}>
          <span>회원 탈퇴</span>
          <span className={style.divider}></span>
        </div>
        <label className={style.inputArea}>
          <p className={style.policy}>
            회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보는
            <br />
            <u>개인정보처리방침</u>에 따라 60일간 보관&#40;잠김&#41;되며, 60일
            경과된 후에는 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수
            없게 됩니다.
            <br />
            작성된 게시물은 삭제되지 않으며, 익명처리 후 Campick으로 소유권이
            귀속됩니다.
          </p>
          <p className={style.policyAllowArea}>
            <input
              type="checkbox"
              className={style.policyCheck}
              onChange={() => checkBoxStatus()}
            />
            <span className={style.policyAllow}>
              회원 탈퇴에 관한 정책을 읽고 이에 동의합니다.
            </span>
          </p>

          <button
            className={style.deleteBtn}
            disabled={!policyCheckStatus}
            onClick={(e) => deleteUser(e)}
          >
            탈퇴하기
          </button>
        </label>
      </form>
    </section>
  );
};

export default CustomerService;
