import React from 'react';
import * as Style from './styled';
import { Button, Icon } from '../../atom';
import { SortDirectionType, IconPosition } from '../../@types/index';
import { IconProps } from '../../atom/Icon';

interface BoxWithIconProps {
  children: React.ReactElement;
  iconProps: IconProps;
  isIconButton?: boolean;
  isContinuous?: boolean;
  sortDirection?: SortDirectionType;
  iconPosition?: IconPosition;
}

function BoxWithIcon({
  children,
  iconProps,
  isIconButton = false,
  isContinuous = false,
  iconPosition = 'left',
  sortDirection = 'row',
}: BoxWithIconProps) {
  return (
    <Style.Container isContinuous={isContinuous} sortDirection={sortDirection}>
      {iconPosition === 'left' ? (
        <>
          {isIconButton ? (
            <Button iconOnly>
              <Icon {...iconProps} />
            </Button>
          ) : (
            <Icon {...iconProps} />
          )}
          {children}
        </>
      ) : (
        <>
          {children}
          {isIconButton ? (
            <Button iconOnly>
              <Icon {...iconProps} />
            </Button>
          ) : (
            <Icon {...iconProps} />
          )}
        </>
      )}
    </Style.Container>
  );
}

export default BoxWithIcon;
