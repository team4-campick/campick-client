const AUTH_ERROR = Object.freeze({
  BLANK: {
    NICKNAME: "닉네임을 입력해주세요",
    CURRENT_PW: "현재 비밀번호를 입력해주세요.",
    NEW_PW: "새로운 비밀번호를 입력해주세요.",
    NEW_PW_CHECK: "새로운 비밀번호 다시 한번 입력해주세요.",
  },
  NOT_MATCHING: {
    CURRENT_PW: "현재 비밀번호가 일치하지 않습니다.",
    NEW_PW: "새로운 비밀번호가 일치하지 않습니다.",
  },
  NOT_EXIST: {
    NICKNAME: "존재하지 않는 닉네임입니다",
  },
  DUPLICATE: "이미 존재하는 닉네임입니다.",
});
const COUPON_ERROR = Object.freeze({
  DUPLICATE: "중복체크 에러",
  EXIST: "이미 발급된 쿠폰입니다.",
});
const CUSTOMER_SERVICE_ERROR = Object.freeze({
  TITLE: "제목을 입력해주세요",
  EMAIL: "이메일을 입력해주세요",
  CONTENT: "내용을 입력해주세요",
});

export { AUTH_ERROR, COUPON_ERROR, CUSTOMER_SERVICE_ERROR };
