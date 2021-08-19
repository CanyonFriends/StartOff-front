import React from 'react';
import * as Style from './styled';
import { Icon } from '../../atom';
import { SortDirectionType } from '../../@types/index';
import { IconProps } from '../../atom/Icon';

interface BoxWithIconProps {
  children: React.ReactElement;
  // iconType: IconType;
  sortDirection?: SortDirectionType;
  // iconSize?: SizeType;
  iconProps: IconProps;
}

function BoxWithIcon({ children, iconProps, sortDirection = 'row' }: BoxWithIconProps) {
  return (
    <Style.Container sortDirection={sortDirection}>
      <Icon {...iconProps} />
      {children}
    </Style.Container>
  );
}

export default BoxWithIcon;
