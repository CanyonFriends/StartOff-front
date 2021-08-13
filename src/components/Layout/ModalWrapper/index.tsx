import React from 'react';
import ReactDOM from 'react-dom';
import * as Style from './styled';

interface ModalWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

function ModalWrapper({ children, backgroundColor = 'transparent' }: ModalWrapperProps) {
  const modalTag = document.getElementById('modal');

  return (
    modalTag &&
    ReactDOM.createPortal(
      <Style.Overlay backgroundColor={backgroundColor}>
        <Style.Container>{children}</Style.Container>;
      </Style.Overlay>,
      modalTag,
    )
  );
}

export default ModalWrapper;
