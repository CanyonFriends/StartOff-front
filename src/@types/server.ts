/**
 * server data type
 */
export interface ProfileServerType {
  baekjoon_id: string;
  blog_url: string;
  github_url: string;
  introduce: string;
  nickname: string;
  projects: ProjectServerResponseType[];
  user_skills: SkillServerType[];
}

export interface ProjectServerResponseType {
  content: string;
  deploy_url: string;
  end_date: string;
  github_url: string;
  id: number;
  introduce: string;
  project_skills: SkillServerType[];
  start_date: string;
  title: string;
}

export interface ProjectServerRequestType {
  content: string;
  deploy_url: string;
  end_date: string;
  github_url: string;
  introduce: string;
  project_skills: string[];
  start_date: string;
  title: string;
}

export interface SkillServerType {
  color: string;
  skill_id: string;
  skill_name: string;
  text_color: string;
}
