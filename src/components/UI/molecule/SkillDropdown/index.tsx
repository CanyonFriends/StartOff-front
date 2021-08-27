import React, { useState } from 'react';
import Overlay from '../../../Layout/Overlay';
import { Button } from '../../atom';
import * as Style from './styled';
import { SkillType } from '../../../../@types/client';

export interface SkillDropdownProps {
  placeholder: string;
  skills: SkillType[];
  clickItem: (skillName: string) => void;
}

function SkillDropdown({ placeholder, skills, clickItem }: SkillDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleClickItem = (skillName: string) => {
    clickItem(skillName);
    toggleDropdown();
  };

  return (
    <Style.Container>
      <Button formButton={false} size="medium" onClick={toggleDropdown}>
        {placeholder}
      </Button>
      {open && (
        <Style.MenuWrapper>
          <Overlay clickModalOutside={toggleDropdown} />
          {skills.map((skill) => (
            <Style.SkillItem key={skill.skillId} id={skill.skillId} onClick={() => handleClickItem(skill.skillName)}>
              {skill.skillName}
            </Style.SkillItem>
          ))}
        </Style.MenuWrapper>
      )}
    </Style.Container>
  );
}

export default SkillDropdown;
