import React from 'react';
import ReactDOM from 'react-dom';
import * as Style from './styled';

interface ModalWrapperProps {
  children: React.ReactNode;
  clickModalOutside: () => void;
  isBlur?: boolean;
}

function ModalWrapper({ children, clickModalOutside, isBlur = false }: ModalWrapperProps) {
  const modalTag = document.getElementById('modal');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    clickModalOutside();
  };

  return (
    modalTag &&
    ReactDOM.createPortal(
      <>
        <Style.Overlay isBlur={isBlur} onClick={handleClick} />
        <Style.Container>{children}</Style.Container>
      </>,
      modalTag,
    )
  );
}

export default ModalWrapper;
