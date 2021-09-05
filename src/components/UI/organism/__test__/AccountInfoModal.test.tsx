/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import AccountInfoModal from '../AccountInfoModal';

beforeEach(() => {
  document.body.innerHTML = `<div id="modal"></div>`;
});

describe('Component/Organism/AccountInfoModal', () => {
  const deleteUser = () => {};
  const handleCloseModal = () => {};
  const changePassword = async () => '';

  it('렌더링', () => {
    const component = render(
      <AccountInfoModal deleteUser={deleteUser} handleCloseModal={handleCloseModal} changePassword={changePassword} />,
    );

    component.getByLabelText('currentpw');
    component.getByLabelText('afterpw');
    component.getByLabelText('confirmpw');
    component.getByText('변경하기');
    component.getByText('탈퇴하기');
  });

  it('현재 비밀번호 입력창이 비었을 경우 validator 에러 발생', () => {
    const component = render(
      <AccountInfoModal deleteUser={deleteUser} handleCloseModal={handleCloseModal} changePassword={changePassword} />,
    );

    const changeButton = component.getByText('변경하기');
    fireEvent.click(changeButton);

    component.findByText('현재 비밀번호를 입력해 주십시오');
  });

  it('이후 비밀번호 입력창이 비었을 경우 validator 에러 발생', async () => {
    const component = render(
      <AccountInfoModal deleteUser={deleteUser} handleCloseModal={handleCloseModal} changePassword={changePassword} />,
    );

    const changeButton = component.getByText('변경하기');
    const currentInput = component.getByLabelText('currentpw');

    fireEvent.change(currentInput, { target: { value: '1q2w3e4r' } });
    fireEvent.click(changeButton);

    await component.findByText('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('이후 비밀번호 입력창이 잘못될 경우 validator 에러 발생', async () => {
    const component = render(
      <AccountInfoModal deleteUser={deleteUser} handleCloseModal={handleCloseModal} changePassword={changePassword} />,
    );

    const changeButton = component.getByText('변경하기');
    const currentInput = component.getByLabelText('currentpw');
    const afterInput = component.getByLabelText('afterpw');

    fireEvent.change(currentInput, { target: { value: '1q2w3e4r' } });
    fireEvent.change(afterInput, { target: { value: '1q2w' } });
    fireEvent.click(changeButton);

    await component.findByText('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('확인 비밀번호가 이후 비밀번호와 다를 때', async () => {
    const component = render(
      <AccountInfoModal deleteUser={deleteUser} handleCloseModal={handleCloseModal} changePassword={changePassword} />,
    );

    const changeButton = component.getByText('변경하기');
    const currentInput = component.getByLabelText('currentpw');
    const afterInput = component.getByLabelText('afterpw');

    fireEvent.change(currentInput, { target: { value: '1q2w3e4r' } });
    fireEvent.change(afterInput, { target: { value: '1q2w3e4r' } });
    fireEvent.click(changeButton);

    await component.findByText('비밀번호가 서로 다릅니다');
  });

  it('비밀번호 변경 함수에서 에러 발생', async () => {
    const changePassword = async () => 'error';
    const component = render(
      <AccountInfoModal deleteUser={deleteUser} handleCloseModal={handleCloseModal} changePassword={changePassword} />,
    );

    const changeButton = component.getByText('변경하기');
    const currentInput = component.getByLabelText('currentpw');
    const afterInput = component.getByLabelText('afterpw');
    const confirmInput = component.getByLabelText('confirmpw');

    fireEvent.change(currentInput, { target: { value: '1q2w3e4r' } });
    fireEvent.change(afterInput, { target: { value: '1q2w3e4r' } });
    fireEvent.change(confirmInput, { target: { value: '1q2w3e4r' } });
    fireEvent.click(changeButton);

    await component.findByText('error');
  });
});
