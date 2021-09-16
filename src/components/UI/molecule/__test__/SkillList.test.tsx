/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import SkillList from '../SkillList';
import { makeSkillMock } from '../../../../__mocks__/client-mock-data';

describe('Component/Molecule/SkillList', () => {
  const totalSkills = [
    makeSkillMock({ skillName: 'typescript' }),
    makeSkillMock({ skillName: 'javascript' }),
    makeSkillMock({ skillName: 'c#' }),
    makeSkillMock({ skillName: 'python' }),
  ];
  const handleClick = () => {};
  it('렌더링 테스트', () => {
    const component = render(<SkillList skillList={totalSkills} handleClickSkill={handleClick} />);

    component.getByText('typescript');
    component.getByText('javascript');
    component.getByText('c#');
    component.getByText('python');
    component.getAllByText('x');
  });

  it('클릭 테스트', async () => {
    let text = '';
    const handleClick = (skillId: string) => {
      text = skillId;
    };
    const component = render(<SkillList skillList={totalSkills} handleClickSkill={handleClick} />);
    const xButton = component.getAllByText('x')[0];
    fireEvent.click(xButton);

    await waitFor(() => {
      expect(text).toBe(totalSkills[0].skillId);
    });
  });
});
