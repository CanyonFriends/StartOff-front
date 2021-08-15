/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import SigninPage from '../Signin';
import { signinFailMockInfo } from '../../__test__/mock-dats';
import { signinAPI } from '../../api/user';

jest.mock('../../api/user');

const signinMockAPI = signinAPI as jest.MockedFunction<typeof signinAPI>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<Signin> 페이지', () => {
  it('snapshot 체크', () => {
    const component = render(<SigninPage />);
    expect(component.container).toMatchSnapshot();
  });

  it('input창들 초기값 비었는지 확인', () => {
    const component = render(<SigninPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const passwordInput = component.getByLabelText('password') as HTMLInputElement;

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('아이디 입력 안하면 경고', () => {
    const component = render(<SigninPage />);
    const loginButton = component.getByText('로그인');

    fireEvent.click(loginButton);
    component.getByText('아이디를 입력해주시기 바랍니다');
  });

  it('비밀번호 입력 안하면 경고', () => {
    const component = render(<SigninPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const loginButton = component.getByText('로그인');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.click(loginButton);
    component.getByText('비밀번호를 입력해주시기 바랍니다');
  });

  it('로그인 실패', () => {
    signinMockAPI.mockReturnValue(signinFailMockInfo);

    const component = render(<SigninPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const passwordInput = component.getByLabelText('password') as HTMLInputElement;
    const loginButton = component.getByText('로그인');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'email@email.com' } });
    fireEvent.click(loginButton);

    waitFor(() => component.getByText('에러 발생'));
  });
});
