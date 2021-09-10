import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { signupAPI, logoutAPI, signinAPI, SigninResponseType } from '../auth';
import { isFailed } from '../error';
import { makeSigninSuccessInfoMock } from '../../__mocks__/client-mock-data';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/auth', () => {
  it('signupAPI', async () => {
    mock.onPost('/v1/signup').reply(200, true);

    const response = await signupAPI({ id: 'shellboy', pw: '1q2w3e4r', nickname: 'nickname' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('signupAPI error', async () => {
    mock.onPost('/v1/signup').reply(400, { error_msg: 'error' });

    const response = await signupAPI({ id: 'shellboy', pw: '1q2w3e4r', nickname: 'nickname' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('signinAPI', async () => {
    const serverResponseType = makeSigninSuccessInfoMock({});
    mock.onPost('/v1/login').reply(200, serverResponseType);

    const response = await signinAPI({ id: 'shellboy', pw: '1q2w3e4r' });
    expect(isFailed<SigninResponseType>(response)).toBeFalsy();

    expect(response).toHaveProperty('access_token', serverResponseType.access_token);
    expect(response).toHaveProperty('email', serverResponseType.email);
    expect(response).toHaveProperty('nickname', serverResponseType.nickname);
    expect(response).toHaveProperty('user_id', serverResponseType.user_id);
    expect(response).toHaveProperty('uuid', serverResponseType.uuid);
  });

  it('signinAPI', async () => {
    mock.onPost('/v1/login').reply(400, { error_msg: 'error' });

    const response = await signinAPI({ id: 'shellboy', pw: '1q2w3e4r' });
    expect(isFailed<SigninResponseType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('logoutAPI', async () => {
    mock.onPost('/v1/logout').reply(200, true);

    const response = await logoutAPI({ email: 'email', accessToken: 'accessToken', uuid: 'uuid' });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('logoutAPI error', async () => {
    mock.onPost('/v1/logout').reply(400, { error_msg: 'error' });

    const response = await logoutAPI({ email: 'email', accessToken: 'accessToken', uuid: 'uuid' });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
