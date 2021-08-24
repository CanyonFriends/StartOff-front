import React from 'react';
import * as Style from './styled';
import { Tag, Title } from '../../atom';
import SkillDropdown from '../../molecule/SkillDropdown';
import { SkillType } from '../../../../@types/client';

export interface ProfileSkillCardProps {
  title: string;
  editableAuthority: boolean;
  mySkillList: SkillType[];
  totalSkillList: SkillType[];
  clickTotalSkillItem: (skillName: string) => void;
}

function ProfileSkillCard({
  title,
  editableAuthority,
  mySkillList,
  clickTotalSkillItem,
  totalSkillList,
}: ProfileSkillCardProps) {
  const handleClickSkillClose = () => {};

  return (
    <Style.Container>
      <Style.Header>
        <Title fontsize="h3">{title}</Title>
        {editableAuthority && (
          <SkillDropdown placeholder="스택 추가" clickItem={clickTotalSkillItem} skills={totalSkillList} />
        )}
      </Style.Header>
      <Style.SkillWrapper>
        {mySkillList.map((skill) => (
          <Style.SkillItem key={skill.skillName}>
            <Tag
              id={skill.skillId}
              name={skill.skillName}
              textColor={skill.textColor}
              color={skill.color}
              onClickClose={editableAuthority ? handleClickSkillClose : undefined}
            />
          </Style.SkillItem>
        ))}
      </Style.SkillWrapper>
    </Style.Container>
  );
}

export default ProfileSkillCard;
