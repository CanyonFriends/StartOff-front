import React from 'react';
import * as Style from './styled';
import { Icon } from '../../atom';
import { SortDirectionType, IconPosition } from '../../@types/index';
import { IconProps } from '../../atom/Icon';

interface BoxWithIconProps {
  children: React.ReactElement;
  iconProps: IconProps;
  isContinuous?: boolean;
  sortDirection?: SortDirectionType;
  iconPosition?: IconPosition;
}

function BoxWithIcon({
  children,
  iconProps,
  isContinuous = false,
  iconPosition = 'left',
  sortDirection = 'row',
}: BoxWithIconProps) {
  return (
    <Style.Container isContinuous={isContinuous} sortDirection={sortDirection}>
      {iconPosition === 'left' ? (
        <>
          <Icon {...iconProps} />
          {children}
        </>
      ) : (
        <>
          {children}
          <Icon {...iconProps} />
        </>
      )}
    </Style.Container>
  );
}

export default BoxWithIcon;
