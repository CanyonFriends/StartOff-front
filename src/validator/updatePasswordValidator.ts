export interface UpdatePasswordValidatorType {
  pw: string;
  confirmPW: string;
}

const updatePasswordValidator = ({ pw, confirmPW }: UpdatePasswordValidatorType) => {
  if (!pw.length) return '비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다';
  if (pw !== confirmPW) return '비밀번호가 서로 다릅니다';
  return '';
};

export default updatePasswordValidator;
