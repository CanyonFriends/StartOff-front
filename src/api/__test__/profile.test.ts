import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ProfileClientType, SkillClientType } from '../../@types/client';
import { makeProfileMock, makeSkillMock } from '../../__mocks__/server-mock.data';
import { isFailed } from '../error';
import {
  getProfileAPI,
  updateBlogIntroduceAPI,
  updateProfileIntroduceAPI,
  updateUserSkillAPI,
  deleteUserSkillAPI,
  updateGithubIntroduceAPI,
} from '../profile';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/profile', () => {
  it('getProfileAPI', async () => {
    const serverResponseValue = makeProfileMock({});
    mock.onGet('/v1/users/1/profile').reply(200, serverResponseValue);

    const response = await getProfileAPI({ userId: '1' });
    expect(isFailed<ProfileClientType>(response)).toBeFalsy();

    if (isFailed<ProfileClientType>(response)) throw Error();
    expect(response).toHaveProperty('baekjoonId', serverResponseValue.baekjoon_id);
    expect(response).toHaveProperty('blogUrl', serverResponseValue.blog_url);
    expect(response).toHaveProperty('githubUrl', serverResponseValue.github_url);
    expect(response).toHaveProperty('introduce', serverResponseValue.introduce);
    expect(response).toHaveProperty('nickname', serverResponseValue.nickname);
    expect(response.projects).toHaveLength(serverResponseValue.projects.length);
    expect(response.userSkills).toHaveLength(serverResponseValue.user_skills.length);
  });

  it('getProfileAPI error', async () => {
    mock.onGet('/v1/users/1/profile').reply(400, { error_msg: 'error' });

    const response = await getProfileAPI({ userId: '1' });
    expect(isFailed<ProfileClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updateProfileIntroduceAPI', async () => {
    mock.onPut('/v1/users/1/introduce').reply(200, true);

    const response = await updateProfileIntroduceAPI({ userId: '1', introduce: 'introduce', nickname: 'nickname' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('updateProfileIntroduceAPI error', async () => {
    mock.onPut('/v1/users/1/introduce').reply(400, { error_msg: 'error' });

    const response = await updateProfileIntroduceAPI({ userId: '1', introduce: 'introduce', nickname: 'nickname' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updateGithubIntroduceAPI', async () => {
    mock.onPut('/v1/users/1/github-url').reply(200, true);

    const response = await updateGithubIntroduceAPI({ userId: '1', githubUrl: 'url' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('updateGithubIntroduceAPI error', async () => {
    mock.onPut('/v1/users/1/github-url').reply(400, { error_msg: 'error' });

    const response = await updateGithubIntroduceAPI({ userId: '1', githubUrl: 'url' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updateBlogIntroduceAPI', async () => {
    mock.onPut('/v1/users/1/blog-url').reply(200, true);

    const response = await updateBlogIntroduceAPI({ userId: '1', blogUrl: 'url' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('updateBlogIntroduceAPI error', async () => {
    mock.onPut('/v1/users/1/blog-url').reply(400, { error_msg: 'error' });

    const response = await updateBlogIntroduceAPI({ userId: '1', blogUrl: 'url' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updateUserSkillAPI', async () => {
    const serverResponseValue = makeSkillMock({});
    mock.onPut('/v1/users/1/skills').reply(200, serverResponseValue);

    const response = await updateUserSkillAPI({ userId: '1', skillName: 'skillname' });
    expect(isFailed<SkillClientType>(response)).toBeFalsy();
    expect(response).toHaveProperty('skillId', String(serverResponseValue.skill_id));
    expect(response).toHaveProperty('color', serverResponseValue.color);
    expect(response).toHaveProperty('skillName', serverResponseValue.skill_name);
    expect(response).toHaveProperty('textColor', serverResponseValue.text_color);
  });

  it('updateUserSkillAPI error', async () => {
    mock.onPut('/v1/users/1/skills').reply(400, { error_msg: 'error' });

    const response = await updateUserSkillAPI({ userId: '1', skillName: 'skillname' });
    expect(isFailed<SkillClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('deleteUserSkillAPI', async () => {
    mock.onDelete('/v1/users/1/skills/1').reply(200, true);

    const response = await deleteUserSkillAPI({ userId: '1', skillId: '1' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('deleteUserSkillAPI error', async () => {
    mock.onDelete('/v1/users/1/skills/1').reply(400, { error_msg: 'error' });

    const response = await deleteUserSkillAPI({ userId: '1', skillId: '1' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
