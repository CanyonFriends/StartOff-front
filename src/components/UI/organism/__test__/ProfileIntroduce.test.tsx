/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import ProfileIntroduce from '../ProfileIntroduce';

describe('Component/Organism/ProfileIntroduce', () => {
  const handleSubmit = async () => '';

  it('렌더링 테스트(수정 불가)', () => {
    const component = render(
      <ProfileIntroduce
        editableAuthority={false}
        nickname="nickname"
        introduce="introduce introduce"
        imageurl="imageurl"
        handleSubmit={handleSubmit}
      />,
    );

    component.getByText('nickname');
    component.getByText('introduce introduce');
  });

  it('렌더링 테스트(수정 가능)', async () => {
    const component = render(
      <ProfileIntroduce
        editableAuthority
        nickname="nickname"
        introduce="introduce introduce"
        imageurl="imageurl"
        handleSubmit={handleSubmit}
      />,
    );

    component.getByText('nickname');
    component.getByText('introduce introduce');
    const modifyButton = component.getByText('수정');

    fireEvent.click(modifyButton);
    // 버튼이 수정 > 저장으로 변경
    component.getByText('저장');
  });

  it('nickname이 비었을 경우 validator에러 발생', async () => {
    const component = render(
      <ProfileIntroduce
        editableAuthority
        nickname="nickname"
        introduce="introduce introduce"
        imageurl="imageurl"
        handleSubmit={handleSubmit}
      />,
    );

    component.getByText('nickname');
    component.getByText('introduce introduce');
    const modifyButton = component.getByText('수정');
    fireEvent.click(modifyButton);
    const nicknameInput = component.getByLabelText('nickname');
    fireEvent.change(nicknameInput, { target: { value: '' } });
    const submitButton = component.getByText('저장');
    fireEvent.click(submitButton);

    await component.findByText('별명을 입력해주십시오');
  });

  it('submit시 에러 발생', async () => {
    const handleSubmit = async () => 'error';
    const component = render(
      <ProfileIntroduce
        editableAuthority
        nickname="nickname"
        introduce="introduce introduce"
        imageurl="imageurl"
        handleSubmit={handleSubmit}
      />,
    );

    const modifyButton = component.getByText('수정');
    fireEvent.click(modifyButton);
    const submitButton = component.getByText('저장');
    fireEvent.click(submitButton);

    await component.findByText('error');
  });

  it('에러 발생 후 모달 닫기', async () => {
    const handleSubmit = async () => 'error';
    const component = render(
      <ProfileIntroduce
        editableAuthority
        nickname="nickname"
        introduce="introduce introduce"
        imageurl="imageurl"
        handleSubmit={handleSubmit}
      />,
    );

    const modifyButton = component.getByText('수정');
    fireEvent.click(modifyButton);
    const submitButton = component.getByText('저장');
    fireEvent.click(submitButton);

    const modalCloseButton = await component.findByText('닫기');
    fireEvent.click(modalCloseButton);
  });
});
