import React from 'react';
import Paragraph from '.';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Atom/Paragraph',
  component: Paragraph,
};

export const paragraphSize = (): React.ReactElement => {
  return (
    <StyleWrapper>
      <div>
        <div className="description">small</div>
        <Paragraph size="small" content="contentcontent" />
      </div>
      <div>
        <div className="description">medium</div>
        <Paragraph size="medium" content="contentcontent" />
      </div>
      <div>
        <div className="description">large</div>
        <Paragraph size="large" content="contentcontent" />
      </div>
      <div>
        <div className="description">extraLarge</div>
        <Paragraph size="extraLarge" content="contentcontent" />
      </div>
    </StyleWrapper>
  );
};
