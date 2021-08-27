/**
 * server data type
 */
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
