import React from 'react';
import Overlay from '../Overlay';
import * as Style from './styled';

interface ModalWrapperProps {
  children: React.ReactNode;
  clickModalOutside: () => void;
  isBlur?: boolean;
}

function ModalWrapper({ children, clickModalOutside, isBlur = false }: ModalWrapperProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    clickModalOutside();
  };

  return (
    <Overlay clickOverlay={handleClick} isBlur={isBlur}>
      <Style.Container>{children}</Style.Container>
    </Overlay>
  );
}

export default ModalWrapper;
