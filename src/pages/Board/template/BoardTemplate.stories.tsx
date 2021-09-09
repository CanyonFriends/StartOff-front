import React from 'react';
import BoardTemplate from '.';
import { makeMockSummarizedPost } from '../../../__mocks__/client-mock-data';

export default {
  title: 'Template/Board',
  component: BoardTemplate,
};

export const boardTemplate = (): React.ReactElement => {
  const summarizedPosts = [makeMockSummarizedPost({}), makeMockSummarizedPost({}), makeMockSummarizedPost({})];
  return <BoardTemplate posts={summarizedPosts} board="board" />;
};
