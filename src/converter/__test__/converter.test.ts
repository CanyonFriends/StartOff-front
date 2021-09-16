import {
  makeProjectResponseMock,
  makeProfileMock as makeProfileServerMock,
  makeSkillMock as makeSkillServerMock,
  makeSummarizedPostMock as makeServerSummarizedPostMock,
  makeBoardMock,
  makePostMock,
  makeCommentMock,
} from '../../__mocks__/server-mock.data';
import { makeCreatePost, makeProjectMock as makeProjectClientMock } from '../../__mocks__/client-mock-data';
import { skillServerType2ClientType } from '../skill';
import { projectServerType2ClientType, projectClientType2ServerReqeustType } from '../project';
import { dateToString } from '../../utils/date';
import { profileResponse2Type } from '../profile';
import {
  summarizedPostServerType2ClientType,
  boardServerType2ClientType,
  createPostClientType2ServerType,
  postServerType2ClientType,
} from '../post';
import { commentServerType2ClientType } from '../comment';

jest.mock('../../utils/date');

const dateToStringMock = dateToString as jest.MockedFunction<typeof dateToString>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Converter/skill', () => {
  it('profileResponse2Type', () => {
    const skillServerMock = makeSkillServerMock({});
    const skillClient = skillServerType2ClientType(skillServerMock);

    expect(skillClient.skillId).toBe(String(skillServerMock.skill_id));
    expect(skillClient.color).toBe(skillServerMock.color);
    expect(skillClient.skillName).toBe(skillServerMock.skill_name);
    expect(skillClient.textColor).toBe(skillServerMock.text_color);
  });
});

describe('Converter/project', () => {
  it('projectServerType2ClientType', () => {
    const projectServerMock = makeProjectResponseMock({});
    const projectClient = projectServerType2ClientType(projectServerMock);

    expect(projectClient.id).toBe(projectServerMock.id);
    expect(projectClient.content).toBe(projectServerMock.content);
    expect(projectClient.deployUrl).toBe(projectServerMock.deploy_url);
    expect(projectClient.githubUrl).toBe(projectServerMock.github_url);
    expect(projectClient.title).toBe(projectServerMock.title);
    expect(projectClient.introduce).toBe(projectServerMock.introduce);
    expect(projectClient.projectSklls.length).toBe(projectServerMock.project_skills.length);
    expect(projectClient.startDate).toEqual(new Date(projectServerMock.start_date));
    expect(projectClient.endDate).toEqual(new Date(projectServerMock.end_date));
  });

  it('projectClientType2ServerRequestType', () => {
    dateToStringMock.mockReturnValue('1998-01-22');
    const projectClientMock = makeProjectClientMock({});
    const projectServerRequest = projectClientType2ServerReqeustType(projectClientMock);

    expect(projectServerRequest.title).toBe(projectClientMock.title);
    expect(projectServerRequest.content).toBe(projectClientMock.content);
    expect(projectServerRequest.deploy_url).toBe(projectClientMock.deployUrl);
    expect(projectServerRequest.github_url).toBe(projectClientMock.githubUrl);
    expect(projectServerRequest.introduce).toBe(projectClientMock.introduce);
    expect(projectServerRequest.project_skills.length).toBe(projectClientMock.projectSklls.length);
    expect(projectServerRequest.start_date).toBe('1998-01-22');
    expect(projectServerRequest.end_date).toBe('1998-01-22');
    expect(dateToStringMock).toBeCalledTimes(2);
  });
});

describe('Converter/profile', () => {
  it('profileResponse2Type', () => {
    const profileServerMock = makeProfileServerMock({});
    const profileClient = profileResponse2Type(profileServerMock);

    expect(profileClient.baekjoonId).toBe(profileServerMock.baekjoon_id);
    expect(profileClient.blogUrl).toBe(profileServerMock.blog_url);
    expect(profileClient.githubUrl).toBe(profileServerMock.github_url);
    expect(profileClient.introduce).toBe(profileServerMock.introduce);
    expect(profileClient.nickname).toBe(profileServerMock.nickname);
    expect(profileClient.projects.length).toBe(profileServerMock.projects.length);
    expect(profileClient.userSkills.length).toBe(profileServerMock.user_skills.length);
  });
});

describe('Converter/post', () => {
  it('summarizedPostServerType2ClientType', () => {
    const summarizedPostServerMock = makeServerSummarizedPostMock({});
    const summarizedPostClient = summarizedPostServerType2ClientType(summarizedPostServerMock);

    expect(summarizedPostClient.title).toBe(summarizedPostServerMock.title);
    expect(summarizedPostClient.createAt).toEqual(new Date(summarizedPostServerMock.created_at));
    expect(summarizedPostClient.nickname).toBe(summarizedPostServerMock.nickname);
    expect(summarizedPostClient.maxPeople).toBe(summarizedPostServerMock.max_people);
    expect(summarizedPostClient.currentPeople).toBe(summarizedPostServerMock.current_people);
    expect(summarizedPostClient.postId).toBe(String(summarizedPostServerMock.post_id));
    expect(summarizedPostClient.postSkills.length).toBe(summarizedPostServerMock.post_skills.length);
  });

  it('boardServerType2ClientType', () => {
    const boardServerMock = makeBoardMock({});
    const boardClient = boardServerType2ClientType(boardServerMock);

    expect(boardClient.content.length).toBe(boardServerMock.content.length);
    expect(boardClient.totalElements).toBe(boardServerMock.totalElements);
    expect(boardClient.totalPages).toBe(boardServerMock.totalPages);
  });

  it('createPostClientType2ServerType', () => {
    const createPostClientMock = makeCreatePost({});
    const createPostServer = createPostClientType2ServerType(createPostClientMock);

    expect(createPostServer.category).toBe(createPostClientMock.category.toUpperCase());
    expect(createPostServer.content).toBe(createPostClientMock.content);
    expect(createPostServer.title).toBe(createPostClientMock.title);
    expect(createPostServer.current_people).toBe(createPostClientMock.currentPeople);
    expect(createPostServer.max_people).toBe(createPostClientMock.maxPeople);
    expect(createPostServer.user_id).toBe(Number(createPostClientMock.userId));
    expect(createPostServer.post_skills.length).toBe(createPostClientMock.postSkills.length);
  });

  it('postServerType2ClientType', () => {
    const postServerMock = makePostMock({});
    const postClient = postServerType2ClientType(postServerMock);

    expect(postClient.postId).toBe(String(postServerMock.post_id));
    expect(postClient.userId).toBe(String(postServerMock.user_id));
    expect(postClient.category).toBe(postServerMock.category);
    expect(postClient.title).toBe(postServerMock.title);
    expect(postClient.content).toBe(postServerMock.content);
    expect(postClient.createdAt).toEqual(new Date(postServerMock.created_at));
    expect(postClient.currentPeople).toBe(postServerMock.current_people);
    expect(postClient.maxPeople).toBe(postServerMock.max_people);
    expect(postClient.nickname).toBe(postServerMock.nickname);
    expect(postClient.postSkills.length).toBe(postServerMock.post_skills.length);
  });
});

describe('Converter/comment', () => {
  it('commentServerType2ClientType', () => {
    const commentServerMock = makeCommentMock({});
    const commentClient = commentServerType2ClientType(commentServerMock);

    expect(commentClient.commentId).toBe(String(commentServerMock.comment_id));
    expect(commentClient.userId).toBe(String(commentServerMock.user_id));
    expect(commentClient.content).toBe(commentServerMock.content);
    expect(commentClient.nickname).toBe(commentServerMock.nickname);
    expect(commentClient.isDeleted).toBeFalsy();
    expect(commentClient.createdAt).toEqual(new Date(commentServerMock.created_at));
  });
});
