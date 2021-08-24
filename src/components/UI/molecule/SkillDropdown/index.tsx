import React, { useState } from 'react';
import Overlay from '../../../Layout/Overlay';
import { Button } from '../../atom';
import * as Style from './styled';
import { SkillType } from '../../../../@types/client';

export interface SkillDropdownProps {
  placeholder: string;
  skills: SkillType[];
  clickItem: (skillId: string) => void;
}

function SkillDropdown({ placeholder, skills, clickItem }: SkillDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <Style.Container>
      <Button size="medium" onClick={toggleDropdown}>
        {placeholder}
      </Button>
      {open && (
        <Style.MenuWrapper>
          <Overlay clickModalOutside={toggleDropdown} />
          {skills.map((skill) => (
            <Style.SkillItem key={skill.skillId} id={skill.skillId} onClick={() => clickItem(skill.skillId)}>
              {skill.skillName}
            </Style.SkillItem>
          ))}
        </Style.MenuWrapper>
      )}
    </Style.Container>
  );
}

export default SkillDropdown;
