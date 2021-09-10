import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { GetSelfResponse, getSelfAPI, updatePasswordAPI } from '../user';
import { isFailed } from '../error';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/user', () => {
  it('getSelfAPI', async () => {
    const serverResponseValue: GetSelfResponse = { user_id: '1', nickname: 'shellboy', email: 'qkrdmstlr3@naver.com' };
    mock.onGet('/v1/users/self').reply(200, serverResponseValue);

    const response = await getSelfAPI();
    expect(isFailed<GetSelfResponse>(response)).toBeFalsy();
    expect(response).toHaveProperty('email', serverResponseValue.email);
    expect(response).toHaveProperty('nickname', serverResponseValue.nickname);
    expect(response).toHaveProperty('user_id', serverResponseValue.user_id);
  });

  it('getSelfAPI error', async () => {
    mock.onGet('/v1/users/self').reply(400, { error_msg: 'error' });

    const response = await getSelfAPI();
    expect(isFailed<GetSelfResponse>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updatePasswordAPI', async () => {
    mock.onPut('/v1/users/1/password').reply(200, true);

    const response = await updatePasswordAPI({ userId: '1', beforePW: '1q2w3e4r', afterPW: '4r3e2w1q' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('updatePasswordAPI error', async () => {
    mock.onPut('/v1/users/1/password').reply(400, { error_msg: 'error' });

    const response = await updatePasswordAPI({ userId: '1', beforePW: '1q2w3e4r', afterPW: '4r3e2w1q' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
