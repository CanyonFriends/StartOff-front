import {
  makeProjectResponseMock,
  makeProfileMock as makeProfileServerMock,
  makeSkillMock as makeSkillServerMock,
} from '../../__mocks__/server-mock.data';
import { makeProjectMock as makeProjectClientMock } from '../../__mocks__/client-mock-data';
import { skillServerType2ClientType } from '../skill';
import { projectServerType2ClientType, projectClientType2ServerReqeustType } from '../project';
import { dateToString } from '../../utils/date';
import { profileResponse2Type } from '../profile';

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
