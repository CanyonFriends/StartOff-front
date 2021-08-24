import React, { useState } from 'react';
import Overlay from '../../../Layout/Overlay';
import { Button } from '../../atom';
import * as Style from './styled';

export interface DropdownTagType {
  id: string;
  content: string;
}

export interface TagDropdownProps {
  placeholder: string;
  tags: DropdownTagType[];
  clickItem: (tagId: string) => void;
}

// FIXME: SKILLDROPDOWN
function TagDropdown({ placeholder, tags, clickItem }: TagDropdownProps) {
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
          {tags.map((tag) => (
            <Style.TagItem key={tag.id} id={tag.id} onClick={() => clickItem(tag.id)}>
              {tag.content}
            </Style.TagItem>
          ))}
        </Style.MenuWrapper>
      )}
    </Style.Container>
  );
}

export default TagDropdown;
