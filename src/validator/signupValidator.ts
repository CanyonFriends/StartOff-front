export interface SignupInfoType {
  id: string;
  pw: string;
  confirmPW?: string;
  nickname: string;
}

const signupValidator = ({ id, pw, confirmPW, nickname }: SignupInfoType) => {
  if (id.length < 5) return '아이디는 5자리 이상이어야 합니다';
  if (nickname.length < 2) return '별명은 2자리 이상이어야 합니다';
  if (pw.length < 6 || pw.replace(/[a-zA-Z0-9]+/g, '').length)
    return '비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다';
  if (pw !== confirmPW) return '비밀번호가 서로 다릅니다';
  return '';
};

export default signupValidator;
