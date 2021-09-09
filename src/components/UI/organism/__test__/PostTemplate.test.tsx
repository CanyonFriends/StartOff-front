/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import PostTemplate from '../PostTemplate';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

describe('Component/Organism/PostTemplate', () => {
  const clickTest = () => {};

  it('렌더링 테스트(수정 불가)', () => {
    const component = render(
      <PostTemplate
        editableAuthority
        title="title"
        content="# content"
        currentPeople={5}
        maxPeople={10}
        postSkills={[makeSkillMock({ skillName: 'javascript' })]}
        nickname="shellboy"
        handleModifyPost={clickTest}
        handleDeletePost={clickTest}
      />,
    );

    component.getByText('5 / 10');
    component.getByText('수정하기');
    component.getByText('삭제하기');
    component.getByText('title');
    component.getByText('content');
    component.getByText('javascript');
  });

  it('렌더링 테스트(수정 불가)', () => {
    const component = render(
      <PostTemplate
        editableAuthority={false}
        title="title"
        content="# content"
        currentPeople={5}
        maxPeople={10}
        postSkills={[makeSkillMock({ skillName: 'javascript' })]}
        nickname="shellboy"
        handleModifyPost={clickTest}
        handleDeletePost={clickTest}
      />,
    );

    component.getByText('5 / 10');
    component.getByText('shellboy');
    component.getByText('title');
    component.getByText('content');
    component.getByText('javascript');
  });

  it('렌더링 테스트(maxPeople이 0)', () => {
    const component = render(
      <PostTemplate
        editableAuthority={false}
        title="title"
        content="# content"
        currentPeople={0}
        maxPeople={0}
        postSkills={[makeSkillMock({ skillName: 'javascript' })]}
        nickname="shellboy"
        handleModifyPost={clickTest}
        handleDeletePost={clickTest}
      />,
    );

    component.getByText('제한없음');
  });
});
