import { BoardServerType, SummarizedPostServerType } from '../@types/server';
import { BoardClientType, SummarizedPostClientType } from '../@types/client';
import { skillServerType2ClientType } from './skill';

export const summarizedPostServerType2ClientType = (
  summarizedPost: SummarizedPostServerType,
): SummarizedPostClientType => {
  return {
    postId: String(summarizedPost.post_id),
    title: summarizedPost.title,
    currentPeople: summarizedPost.current_people,
    maxPeople: summarizedPost.max_people,
    createAt: new Date(summarizedPost.created_at),
    nickname: summarizedPost.nickname,
    postSkills: summarizedPost.post_skills.map((skill) => skillServerType2ClientType(skill)),
  };
};

export const boardServerType2ClientType = (board: BoardServerType): BoardClientType => {
  return {
    content: board.content.map((post) => summarizedPostServerType2ClientType(post)),
    totalElements: board.totalElements,
    totalPages: board.totalPages,
  };
};
