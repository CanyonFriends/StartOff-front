export interface ModifyProfileIntroduceValidatorType {
  imageurl: string;
  nickname: string;
  introduce: string;
}

const modifyProfileIntroduceValidator = ({ nickname }: ModifyProfileIntroduceValidatorType) => {
  if (!nickname.length) return '별명을 입력해주십시오';
  return '';
};

export default modifyProfileIntroduceValidator;
