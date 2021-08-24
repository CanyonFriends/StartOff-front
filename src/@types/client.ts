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
  content: string;
  deployUrl: string;
  endDate: string;
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
