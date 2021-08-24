import React from 'react';
import ReactDOM from 'react-dom';
import * as Style from './styled';

interface OverlayProps {
  clickModalOutside: () => void;
}

function Overlay({ clickModalOutside }: OverlayProps) {
  const modalTag = document.getElementById('modal');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    clickModalOutside();
  };

  return (
    modalTag &&
    ReactDOM.createPortal(
      <>
        <Style.Overlay onClick={handleClick} />
      </>,
      modalTag,
    )
  );
}

export default Overlay;
