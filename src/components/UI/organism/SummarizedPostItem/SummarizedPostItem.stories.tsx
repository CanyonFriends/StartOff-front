import React from 'react';
import SummarizedPostItem from '.';
import StyleWrapper from '../../../../common/styleWrapper';
import { makeMockSummarizedPost } from '../../../../__test__/mock-dats';

export default {
  title: 'Organism/SummarizedPostItem',
  component: SummarizedPostItem,
};

export const summarizedPostItem = (): React.ReactElement => {
  return (
    <StyleWrapper>
      <div>
        <div className="description">not finished</div>
        <SummarizedPostItem post={makeMockSummarizedPost({})} />
      </div>
      <div>
        <div className="description">finished</div>
        <SummarizedPostItem post={makeMockSummarizedPost({ maxPeople: 10, currentPeople: 10 })} />
      </div>
    </StyleWrapper>
  );
};
