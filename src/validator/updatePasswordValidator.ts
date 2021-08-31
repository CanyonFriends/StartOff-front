export interface UpdatePasswordValidatorType {
  currentPW: string;
  afterPW: string;
  confirmPW: string;
}

const updatePasswordValidator = ({ currentPW, afterPW, confirmPW }: UpdatePasswordValidatorType) => {
  if (!currentPW.length) return '현재 비밀번호를 입력해 주십시오';
  if (afterPW.length < 6 || afterPW.replace(/[a-zA-Z0-9]+/g, '').length)
    return '비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다';
  if (afterPW !== confirmPW) return '비밀번호가 서로 다릅니다';
  return '';
};

export default updatePasswordValidator;
