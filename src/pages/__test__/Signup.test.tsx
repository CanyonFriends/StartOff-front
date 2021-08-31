/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import SignupPage from '../Signup';
import { signupFailMockInfo } from '../../__mocks__/client-mock-data';
import { signupAPI } from '../../api/auth';

jest.mock('../../api/auth');

const signupMockAPI = signupAPI as jest.MockedFunction<typeof signupAPI>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<Signup> 페이지', () => {
  it('snapshot 체크', () => {
    const component = render(<SignupPage />);
    expect(component.container).toMatchSnapshot();
  });

  it('input창들 초기값 비었는지 확인', () => {
    const component = render(<SignupPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const passwordInput = component.getByLabelText('password') as HTMLInputElement;
    const confirmPasswordInput = component.getByLabelText('confirmPassword') as HTMLInputElement;
    const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');
    expect(nicknameInput.value).toBe('');
  });

  it('아이디 경고', () => {
    const component = render(<SignupPage />);
    const signupButton = component.getByText('회원가입');

    fireEvent.click(signupButton);
    component.getByText('이메일을 입력해주십시오');
  });

  it('별명 경고', () => {
    const component = render(<SignupPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const signupButton = component.getByText('회원가입');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.click(signupButton);
    component.getByText('별명은 2자리 이상이어야 합니다');
  });

  it('비밀번호 경고', () => {
    const component = render(<SignupPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
    const signupButton = component.getByText('회원가입');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(nicknameInput, { target: { value: 'nickname' } });
    fireEvent.click(signupButton);
    component.getByText('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('비밀번호 중복 경고', () => {
    const component = render(<SignupPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const passwordInput = component.getByLabelText('password') as HTMLInputElement;
    const confirmPasswordInput = component.getByLabelText('confirmPassword') as HTMLInputElement;
    const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
    const signupButton = component.getByText('회원가입');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'confirmpassword' } });
    fireEvent.change(nicknameInput, { target: { value: 'nickname' } });
    fireEvent.click(signupButton);
    component.getByText('비밀번호가 서로 다릅니다');
  });

  it('회원가입 실패', () => {
    signupMockAPI.mockReturnValue(new Promise((res) => res(signupFailMockInfo)));

    const component = render(<SignupPage />);
    const emailInput = component.getByLabelText('email') as HTMLInputElement;
    const passwordInput = component.getByLabelText('password') as HTMLInputElement;
    const confirmPasswordInput = component.getByLabelText('confirmPassword') as HTMLInputElement;
    const nicknameInput = component.getByLabelText('nickname') as HTMLInputElement;
    const signupButton = component.getByText('회원가입');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.change(nicknameInput, { target: { value: 'nickname' } });
    fireEvent.click(signupButton);

    waitFor(() => component.getByText('에러 발생'));
  });
});
