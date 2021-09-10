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

export interface SummarizedPostServerType {
  post_id: number;
  title: string;
  nickname: string;
  created_at: string;
  current_people: number;
  max_people: number;
  post_skills: SkillServerType[];
}

export interface BoardServerType {
  content: SummarizedPostServerType[];
  totalElements: number;
  totalPages: number;
}

export interface CreatePostServerType {
  category: string;
  content: string;
  current_people: number;
  max_people: number;
  post_skills: string[];
  title: string;
  user_id: number;
}

export interface PostServerType {
  post_id: number;
  category: string;
  title: string;
  content: string;
  created_at: string;
  current_people: number;
  max_people: number;
  nickname: string;
  user_id: number;
  post_skills: SkillServerType[];
  // TODO: comments 추가
}
