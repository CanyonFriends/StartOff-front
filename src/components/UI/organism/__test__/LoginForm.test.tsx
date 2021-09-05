/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import LoginForm from '../LoginForm';

describe('Component/Organism/LoginForm', () => {
  const handleSubmit = async () => '';

  it('렌더링 테스트', () => {
    const component = render(<LoginForm handleSubmit={handleSubmit} />);

    component.getByLabelText('email');
    component.getByLabelText('password');
    component.getByLabelText('email-label');
    component.getByLabelText('password-label');
  });

  it('이메일 없이 제출을 눌렀을 경우', async () => {
    const component = render(<LoginForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('로그인');
    fireEvent.click(submitButton);
    await component.findByText('아이디를 입력해주시기 바랍니다');
  });

  it('비밀번호 없이 제출을 눌렀을 경우', async () => {
    const component = render(<LoginForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('로그인');
    const emailInput = component.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.click(submitButton);
    await component.findByText('비밀번호를 입력해주시기 바랍니다');
  });

  it('submit함수에서 에러가 발생했을 경우', async () => {
    const handleSubmit = async () => 'error';
    const component = render(<LoginForm handleSubmit={handleSubmit} />);

    const submitButton = component.getByText('로그인');
    const emailInput = component.getByLabelText('email');
    const passwordInput = component.getByLabelText('password');
    fireEvent.change(emailInput, { target: { value: 'qkrdmstlr3@naver.com' } });
    fireEvent.change(passwordInput, { target: { value: '1q2w3e4r' } });
    fireEvent.click(submitButton);
    await component.findByText('error');
  });
});
