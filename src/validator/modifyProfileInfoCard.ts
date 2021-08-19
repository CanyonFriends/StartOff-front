export interface ModifyProfileInfoCardType {
  textValue: string;
}

const modifyProfileInfoCard = ({ textValue }: ModifyProfileInfoCardType) => {
  if (!textValue.length) return '내용을 입력해주십시오';
  return '';
};

export default modifyProfileInfoCard;
