import React from 'react';
import { SkillClientType } from '../../../../@types/client';
import { Tag } from '../../atom';
import * as Style from './styled';

interface SkillListProps {
  skillList: SkillClientType[];
  handleClickSkill?: (skillId: string) => void;
}

function SkillList({ skillList, handleClickSkill }: SkillListProps) {
  return (
    <Style.Container>
      {skillList.map((skill) => (
        <Style.SkillItem key={skill.skillName}>
          <Tag
            id={skill.skillId}
            name={skill.skillName}
            textColor={skill.textColor}
            color={skill.color}
            onClickClose={handleClickSkill}
          />
        </Style.SkillItem>
      ))}
    </Style.Container>
  );
}

export default SkillList;
