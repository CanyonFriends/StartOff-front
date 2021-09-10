import { BoardServerType, SummarizedPostServerType, CreatePostServerType, PostServerType } from '../@types/server';
import { BoardClientType, SummarizedPostClientType, CreatePostClientType, PostClientType } from '../@types/client';
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

export const createPostClientType2ServerType = (post: CreatePostClientType): CreatePostServerType => {
  return {
    category: post.category.toUpperCase(),
    content: post.content,
    current_people: post.currentPeople,
    max_people: post.maxPeople,
    post_skills: post.postSkills.map((skill) => skill.skillName),
    title: post.title,
    user_id: Number(post.userId),
  };
};

export const postServerType2ClientType = (post: PostServerType): PostClientType => {
  return {
    postId: String(post.post_id),
    category: post.category,
    title: post.title,
    content: post.content,
    createdAt: new Date(post.created_at),
    currentPeople: post.current_people,
    maxPeople: post.max_people,
    nickname: post.nickname,
    postSkills: post.post_skills.map((skill) => skillServerType2ClientType(skill)),
    userId: String(post.user_id),
  };
};
