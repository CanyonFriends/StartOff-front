import React, { useMemo } from 'react';
import * as Style from './styled';
import { Title } from '../../atom';
import { Dropdown, SkillList } from '../../molecule';
import { SkillClientType } from '../../../../@types/client';
import Label, { LabelProps } from '../../atom/Label/index';

export interface SkillListEditorProps {
  title?: string;
  label?: LabelProps;
  editableAuthority: boolean;
  mySkillList: SkillClientType[];
  totalSkillList: SkillClientType[];
  clickTotalSkillItem: (skillName: string) => void;
  deleteMySkill: (skillId: string) => void;
}

function SkillListEditor({
  title,
  label,
  editableAuthority,
  mySkillList,
  clickTotalSkillItem,
  totalSkillList,
  deleteMySkill,
}: SkillListEditorProps) {
  const totalSkillListExceptMine = useMemo(() => {
    return totalSkillList.filter((skill) => !mySkillList.find((mySkill) => mySkill.skillName === skill.skillName));
  }, [mySkillList.length, totalSkillList.length]);

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
      <SkillList skillList={mySkillList} handleClickSkill={editableAuthority ? deleteMySkill : undefined} />
    </Style.Container>
  );
}

export default SkillListEditor;
