/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import SignupForm from '../SignupForm';

describe('Component/Organism/SignupForm', () => {
  const handleSubmit = async () => '';

  it('렌더링 테스트', () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    component.getByLabelText('email');
    component.getByLabelText('password');
    component.getByLabelText('confirmPassword');
    component.getByLabelText('nickname');
    component.getByLabelText('email-label');
    component.getByLabelText('password-label');
    component.getByLabelText('confirm-password-label');
    component.getByLabelText('nickname-label');
  });

  it('이메일 없이 제출을 눌렀을 경우', async () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    fireEvent.click(submitButton);
    await component.findByText('이메일을 입력해주십시오');
  });

  it('별명 없이 제출을 눌렀을 경우', async () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    const emailInput = component.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.click(submitButton);
    await component.findByText('별명은 2자리 이상이어야 합니다');
  });

  it('별명이 1글자로 제출을 눌렀을 경우', async () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    const emailInput = component.getByLabelText('email');
    const nicknameInput = component.getByLabelText('nickname');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.change(nicknameInput, { target: { value: 's' } });
    fireEvent.click(submitButton);
    await component.findByText('별명은 2자리 이상이어야 합니다');
  });

  it('비밀번호를 입력하지 않았을 경우', async () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    const emailInput = component.getByLabelText('email');
    const nicknameInput = component.getByLabelText('nickname');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.change(nicknameInput, { target: { value: 'shellboy' } });
    fireEvent.click(submitButton);
    await component.findByText('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('비밀번호를 제대로 입력하지 않을 경우', async () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    const emailInput = component.getByLabelText('email');
    const nicknameInput = component.getByLabelText('nickname');
    const passwordInput = component.getByLabelText('password');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.change(nicknameInput, { target: { value: 'shellboy' } });
    fireEvent.change(passwordInput, { target: { value: '1q2w' } });
    fireEvent.click(submitButton);
    await component.findByText('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('비밀번호확인과 다를 경우', async () => {
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    const emailInput = component.getByLabelText('email');
    const nicknameInput = component.getByLabelText('nickname');
    const passwordInput = component.getByLabelText('password');
    const confirmPasswordInput = component.getByLabelText('confirmPassword');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.change(nicknameInput, { target: { value: 'shellboy' } });
    fireEvent.change(passwordInput, { target: { value: '1q2w3e4r' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '4r3e2w1q' } });
    fireEvent.click(submitButton);
    await component.findByText('비밀번호가 서로 다릅니다');
  });

  it('submit함수에서 에러가 발생했을 경우', async () => {
    const handleSubmit = async () => 'error';
    const component = render(<SignupForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('회원가입');
    const emailInput = component.getByLabelText('email');
    const nicknameInput = component.getByLabelText('nickname');
    const passwordInput = component.getByLabelText('password');
    const confirmPasswordInput = component.getByLabelText('confirmPassword');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.change(nicknameInput, { target: { value: 'shellboy' } });
    fireEvent.change(passwordInput, { target: { value: '1q2w3e4r' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '1q2w3e4r' } });
    fireEvent.click(submitButton);
    await component.findByText('error');
  });
});
