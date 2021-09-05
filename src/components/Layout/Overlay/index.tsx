import React from 'react';
import ReactDOM from 'react-dom';
import * as Style from './styled';

interface OverlayProps {
  clickOverlay: (event: React.MouseEvent<HTMLDivElement>) => void;
  isBlur?: boolean;
  children?: React.ReactNode;
}

function Overlay({ clickOverlay, children, isBlur = false }: OverlayProps) {
  const modalTag = document.getElementById('modal');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    clickOverlay(event);
  };

  return (
    modalTag &&
    ReactDOM.createPortal(
      <>
        <Style.Overlay aria-label="overlay" onClick={handleClick} isBlur={isBlur} />
        {children}
      </>,
      modalTag,
    )
  );
}

export default Overlay;
