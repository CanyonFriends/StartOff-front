export interface ModifyProfileInfoCardValidatorType {
  textValue: string;
}

const modifyProfileInfoCardValidator = ({ textValue }: ModifyProfileInfoCardValidatorType) => {
  if (!textValue.length) return '내용을 입력해주십시오';
  return '';
};

export default modifyProfileInfoCardValidator;
