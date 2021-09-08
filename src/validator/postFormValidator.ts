import { SkillClientType } from '../@types/client';

export interface PostFormValidatorType {
  title: string;
  content: string;
  maxPeople: number;
  currentPeople: number;
  postSkills: SkillClientType[];
}

const postFormValidator = ({ title, content, maxPeople, currentPeople }: PostFormValidatorType) => {
  if (title.length < 5) return '제목은 5글자 이상이여야합니다';
  if (!content.length) return '내용을 입력해주십시오';
  if (maxPeople < currentPeople) return '현재인원은 최대인원보다 클 수 없습니다';
  return '';
};

export default postFormValidator;
