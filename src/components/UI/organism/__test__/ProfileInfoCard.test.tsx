/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import ProfileInfoCard from '../ProfileInfoCard';

describe('Component/Organism/ProfileInfoCard', () => {
  const handleSubmit = async () => '';
  it('렌더링 테스트(수정 불가)', () => {
    const component = render(
      <ProfileInfoCard
        editableAuthority={false}
        title="title"
        textValue="text value"
        iconType="Home"
        handleSubmit={handleSubmit}
      />,
    );

    component.getByText('title');
    component.getByText('text value');
    component.getByLabelText('home-icon');
  });

  it('렌더링 테스트(수정 가능)', async () => {
    const component = render(
      <ProfileInfoCard
        editableAuthority
        title="title"
        textValue="text value"
        iconType="Home"
        handleSubmit={handleSubmit}
      />,
    );

    component.getByText('title');
    component.getByText('text value');
    component.getByLabelText('home-icon');
    const modifyButton = component.getByLabelText('home-pencil');

    fireEvent.click(modifyButton);
    // 버튼이 수정 > 저장으로 변경
    await component.findByLabelText('home-disk');
  });

  it('text value가 비었을 때 validator에러 발생', async () => {
    const component = render(
      <ProfileInfoCard
        editableAuthority
        title="title"
        textValue="text value"
        iconType="Home"
        handleSubmit={handleSubmit}
      />,
    );

    const modifyButton = component.getByLabelText('home-pencil');
    fireEvent.click(modifyButton);
    const textInput = component.getByLabelText('title-input');
    fireEvent.change(textInput, { target: { value: '' } });

    const submitButton = await component.findByLabelText('home-disk');
    fireEvent.click(submitButton);

    await component.findByText('내용을 입력해주십시오');
  });

  it('submit시 에러 발생', async () => {
    const handleSubmit = async () => 'error';
    const component = render(
      <ProfileInfoCard
        editableAuthority
        title="title"
        textValue="text value"
        iconType="Home"
        handleSubmit={handleSubmit}
      />,
    );

    const modifyButton = component.getByLabelText('home-pencil');
    fireEvent.click(modifyButton);
    const submitButton = await component.findByLabelText('home-disk');
    fireEvent.click(submitButton);

    await component.findByText('error');
  });

  it('에러 발생 후 모달 닫기', async () => {
    const handleSubmit = async () => 'error';
    const component = render(
      <ProfileInfoCard
        editableAuthority
        title="title"
        textValue="text value"
        iconType="Home"
        handleSubmit={handleSubmit}
      />,
    );

    const modifyButton = component.getByLabelText('home-pencil');
    fireEvent.click(modifyButton);
    const submitButton = await component.findByLabelText('home-disk');
    fireEvent.click(submitButton);

    const modalCloseButton = await component.findByText('닫기');
    fireEvent.click(modalCloseButton);
  });
});
