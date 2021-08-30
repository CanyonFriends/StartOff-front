import React, { useMemo } from 'react';
import * as Style from './styled';
import { Tag, Title } from '../../atom';
import { Dropdown } from '../../molecule';
import { SkillType } from '../../../../@types/client';
import Label, { LabelProps } from '../../atom/Label/index';

export interface SkillListProps {
  title?: string;
  label?: LabelProps;
  editableAuthority: boolean;
  mySkillList: SkillType[];
  totalSkillList: SkillType[];
  clickTotalSkillItem: (skillName: string) => void;
  deleteMySkill: (skillId: string) => void;
}

function SkillList({
  title,
  label,
  editableAuthority,
  mySkillList,
  clickTotalSkillItem,
  totalSkillList,
  deleteMySkill,
}: SkillListProps) {
  const totalSkillListExceptMine = useMemo(() => {
    return totalSkillList.filter((skill) => !mySkillList.find((mySkill) => mySkill.skillName === skill.skillName));
  }, [mySkillList.length]);

  return (
    <Style.Container>
      <Style.Header>
        {title && <Title fontsize="h3">{title}</Title>}
        {label && <Label {...label} />}
        {editableAuthority && (
          <Dropdown
            isClickValueText
            placeholder="스택 추가"
            clickItem={clickTotalSkillItem}
            items={totalSkillListExceptMine.map((skill) => ({ id: skill.skillId, text: skill.skillName }))}
          />
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

export default SkillList;
