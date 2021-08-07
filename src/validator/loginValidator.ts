export interface LoginInfoType {
  id: string;
  pw: string;
}

const loginValidator = ({ id, pw }: LoginInfoType) => {
  if (!id.length) return '아이디를 입력해주시기 바랍니다';
  if (!pw.length) return '비밀번호를 입력해주시기 바랍니다';
  return '';
};

export default loginValidator;
