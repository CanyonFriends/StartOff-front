import React, { useState } from 'react';
import Overlay from '../../../Layout/Overlay';
import { Button } from '../../atom';
import * as Style from './styled';

interface ItemProps {
  id: string;
  text: string;
}

export interface DropdownProps {
  placeholder: string;
  items: ItemProps[];
  ariaLabel?: string;
  isClickValueText?: boolean;
  clickItem: (id: string) => void;
}

function Dropdown({ ariaLabel = '', placeholder, items, clickItem, isClickValueText = false }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleClickItem = (skillName: string) => {
    clickItem(skillName);
    toggleDropdown();
  };

  return (
    <Style.Container aria-label={ariaLabel}>
      <Button formButton={false} size="medium" onClick={toggleDropdown}>
        {placeholder}
      </Button>
      {open && (
        <Style.MenuWrapper>
          <Overlay clickOverlay={toggleDropdown} />
          {items.map((item) => (
            <Style.Item
              key={item.id}
              id={item.id}
              onClick={() => handleClickItem(isClickValueText ? item.text : item.id)}
            >
              {item.text}
            </Style.Item>
          ))}
        </Style.MenuWrapper>
      )}
    </Style.Container>
  );
}

export default Dropdown;
