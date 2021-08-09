import React from 'react';
import * as Style from './styled';
import { Icon } from '../../atom';
import { SizeType, IconType, SortDirectionType } from '../../@types/index';

interface BoxWithIconProps {
  children: React.ReactElement;
  iconType: IconType;
  sortDirection?: SortDirectionType;
  iconSize?: SizeType;
}

function BoxWithIcon({ children, iconType, iconSize = 'large', sortDirection = 'row' }: BoxWithIconProps) {
  return (
    <Style.Container sortDirection={sortDirection}>
      <Icon size={iconSize} icon={iconType} />
      {children}
    </Style.Container>
  );
}

export default BoxWithIcon;
