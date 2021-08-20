import React, { useState } from 'react';
import * as Style from './styled';
import { Tag, Title } from '../../atom';
import { TagProps } from '../../atom/Tag';
import { BoxWithIcon } from '../../molecule';
import { IconProps } from '../../atom/Icon';

interface ProfileTagCardProps {
  title: string;
  editableAuthority: boolean;
  tagContent: TagProps[];
}

function ProfileTagCard({ title, editableAuthority, tagContent }: ProfileTagCardProps) {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleClickTagClose = () => {};

  const modifyIconProps: IconProps = {
    icon: isEditable ? 'Disk' : 'Pencil',
    onClick: toggleEditable,
  };

  return (
    <Style.Container>
      <BoxWithIcon iconPosition="right" iconProps={modifyIconProps}>
        <Style.Form>
          <Title fontsize="h2">{title}</Title>
          {/* TODO: 여기 드롭다운 적용되어야 할 듯? icon은 없어도 될듯? */}
          {isEditable && <></>}
        </Style.Form>
      </BoxWithIcon>
      <Style.TagWrapper>
        {tagContent.map((tag) => (
          <Style.TagItem>
            <Tag
              text={tag.text}
              backgroundColor={tag.backgroundColor}
              color={tag.color}
              onClickClose={editableAuthority ? handleClickTagClose : undefined}
            />
          </Style.TagItem>
        ))}
      </Style.TagWrapper>
    </Style.Container>
  );
}

export default ProfileTagCard;
