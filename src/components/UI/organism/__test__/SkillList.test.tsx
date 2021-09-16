/**
 * @jest-environment jsdom
 */
import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import SkillListEditor from '../SkillListEditor';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

describe('Component/Organism/SkillListEditor', () => {
  const clickTotalSkillItem = () => {};
  const deleteMySkill = () => {};
  const mySkillList = [makeSkillMock({ skillName: 'javascript' }), makeSkillMock({ skillName: 'typescript' })];

  it('렌더링 테스트(수정 가능)(title일 경우)', () => {
    const component = render(
      <SkillListEditor
        editableAuthority
        title="title"
        mySkillList={mySkillList}
        totalSkillList={[]}
        clickTotalSkillItem={clickTotalSkillItem}
        deleteMySkill={deleteMySkill}
      />,
    );

    component.getByText('스택 추가');
    component.getByText('javascript');
    component.getByText('typescript');
    const title = component.getByText('title');
    expect(title.tagName).toBe('H3');
  });

  it('렌더링 테스트(수정 가능)(label일 경우)', () => {
    const component = render(
      <SkillListEditor
        editableAuthority
        label={{ content: 'label' }}
        mySkillList={mySkillList}
        totalSkillList={[]}
        clickTotalSkillItem={clickTotalSkillItem}
        deleteMySkill={deleteMySkill}
      />,
    );

    component.getByText('스택 추가');
    component.getByText('javascript');
    component.getByText('typescript');
    const label = component.getByText('label');
    expect(label.tagName).toBe('LABEL');
  });
});
