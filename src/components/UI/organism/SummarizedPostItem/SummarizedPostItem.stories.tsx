import React from 'react';
import SummarizedPostItem from '.';
import StyleWrapper from '../../../../style/styleWrapper';
import { makeSummarizedPostMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Organism/SummarizedPostItem',
  component: SummarizedPostItem,
};

export const summarizedPostItem = (): React.ReactElement => {
  return (
    <StyleWrapper>
      <div>
        <div className="description">not finished</div>
        <SummarizedPostItem post={makeSummarizedPostMock({})} />
      </div>
      <div>
        <div className="description">finished</div>
        <SummarizedPostItem post={makeSummarizedPostMock({ maxPeople: 10, currentPeople: 10 })} />
      </div>
    </StyleWrapper>
  );
};
