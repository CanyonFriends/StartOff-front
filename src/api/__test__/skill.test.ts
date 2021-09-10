import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getSkillsAPI } from '../skill';
import { isFailed } from '../error';
import { SkillClientType } from '../../@types/client';
import { makeSkillMock } from '../../__mocks__/server-mock.data';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/post', () => {
  it('getSkillsAPI', async () => {
    const serverResponseValue = [makeSkillMock({})];
    mock.onGet('/v1/skills').reply(200, serverResponseValue);

    const response = await getSkillsAPI();
    expect(isFailed<SkillClientType[]>(response)).toBeFalsy();
    expect(response).toHaveLength(serverResponseValue.length);
  });

  it('getSkillsAPI error', async () => {
    mock.onGet('/v1/skills').reply(400, { error_msg: 'error' });

    const response = await getSkillsAPI();
    expect(isFailed<SkillClientType[]>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
