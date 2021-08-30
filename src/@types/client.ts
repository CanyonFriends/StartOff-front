/**
 * client data type
 */
export interface ProfileType {
  baekjoonId: string;
  blogUrl: string;
  githubUrl: string;
  introduce: string;
  nickname: string;
  projects: ProjectType[];
  userSkills: SkillType[];
}

export interface ProjectType {
  title: string;
  content: string;
  deployUrl: string;
  startDate: Date;
  endDate: Date;
  githubUrl: string;
  id: number;
  introduce: string;
  projectSklls: SkillType[];
}

export interface SkillType {
  skillId: string;
  color: string;
  skillName: string;
  textColor: string;
}

export interface SummarizedPostType {
  postId: string;
  title: string;
  currentPeople?: number;
  maxPeople?: number;
  createAt: Date;
  user: { nickname: string };
  postSkills: SkillType[];
}
