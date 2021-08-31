import { SkillClientType } from '../@types/client';

export interface ProjectValidatorType {
  id: number | undefined;
  title: string;
  introduce: string;
  content: string;
  deployUrl: string;
  githubUrl: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  projectSklls: SkillClientType[];
  isProgress?: boolean;
}

const projectValidator = ({ title, startDate, endDate, isProgress }: ProjectValidatorType) => {
  if (!title.length) return '프로젝트명을 입력해주십시오';
  if (!startDate) return '시작일을 입력해주십시오';
  if (!isProgress && !endDate) return '종료일을 입력해주십시오';
  return '';
};

export default projectValidator;
