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

  return (
    modalTag &&
    ReactDOM.createPortal(
      <>
        <Style.Overlay isBlur={isBlur} onClick={clickModalOutside} />
        <Style.Container>{children}</Style.Container>
      </>,
      modalTag,
    )
  );
}

export default ModalWrapper;
