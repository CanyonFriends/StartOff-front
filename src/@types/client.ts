/**
 * client data type
 */
export interface ProfileClientType {
  baekjoonId: string;
  blogUrl: string;
  githubUrl: string;
  introduce: string;
  nickname: string;
  projects: ProjectClientType[];
  userSkills: SkillClientType[];
}

export interface ProjectClientType {
  title: string;
  content: string;
  deployUrl: string;
  startDate: Date;
  endDate: Date;
  githubUrl: string;
  id: number;
  introduce: string;
  projectSklls: SkillClientType[];
}

export interface SkillClientType {
  skillId: string;
  color: string;
  skillName: string;
  textColor: string;
}

export interface SummarizedPostClientType {
  postId: string;
  title: string;
  currentPeople?: number;
  maxPeople?: number;
  createAt: Date;
  user: { nickname: string };
  postSkills: SkillClientType[];
}
