import React, { useMemo } from 'react';
import * as Style from './styled';
import { Tag, Title } from '../../atom';
import { TagProps } from '../../atom/Tag';
import TagDropdown from '../../molecule/TagDropdown';
import { DropdownTagType } from '../../molecule/TagDropdown/index';

export interface ProfileTagCardProps {
  title: string;
  editableAuthority: boolean;
  tagContents: TagProps[];
  clickTagItem: (tagName: string) => void;
}

function ProfileTagCard({ title, editableAuthority, tagContents, clickTagItem }: ProfileTagCardProps) {
  const tagForDropdown: DropdownTagType[] = useMemo(() => {
    return tagContents.map((tag) => ({
      id: tag.skillId,
      content: tag.skillName,
    }));
  }, [tagContents]);

  const handleClickTagClose = () => {};

  return (
    <Style.Container>
      <Style.Header>
        <Title fontsize="h3">{title}</Title>
        {editableAuthority && <TagDropdown placeholder="스택 추가" clickItem={clickTagItem} tags={tagForDropdown} />}
      </Style.Header>
      <Style.TagWrapper>
        {tagContents.map((tag) => (
          <Style.TagItem key={tag.skillName}>
            <Tag
              skillId={tag.skillId}
              skillName={tag.skillName}
              textColor={tag.textColor}
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
