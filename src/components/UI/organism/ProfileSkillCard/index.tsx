import React, { useMemo } from 'react';
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
  deleteMySkill: (skillId: string) => void;
}

function ProfileSkillCard({
  title,
  editableAuthority,
  mySkillList,
  clickTotalSkillItem,
  totalSkillList,
  deleteMySkill,
}: ProfileSkillCardProps) {
  const totalSkillListExceptMine = useMemo(() => {
    return totalSkillList.filter((skill) => !mySkillList.find((mySkill) => mySkill.skillName === skill.skillName));
  }, [mySkillList.length]);

  return (
    <Style.Container>
      <Style.Header>
        <Title fontsize="h3">{title}</Title>
        {editableAuthority && (
          <SkillDropdown placeholder="스택 추가" clickItem={clickTotalSkillItem} skills={totalSkillListExceptMine} />
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
              onClickClose={editableAuthority ? deleteMySkill : undefined}
            />
          </Style.SkillItem>
        ))}
      </Style.SkillWrapper>
    </Style.Container>
  );
}

export default ProfileSkillCard;
