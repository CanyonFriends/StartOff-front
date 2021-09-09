import React from 'react';
import { action } from '@storybook/addon-actions';
import BoardTemplate from '.';
import { makeMockSummarizedPost } from '../../../__mocks__/client-mock-data';

export default {
  title: 'Template/Board',
  component: BoardTemplate,
};

const clickAction = action('click');
export const boardTemplate = (): React.ReactElement => {
  const summarizedPosts = [makeMockSummarizedPost({}), makeMockSummarizedPost({}), makeMockSummarizedPost({})];
  return (
    <BoardTemplate
      posts={summarizedPosts}
      board="board"
      totalPage={12}
      currentPage={1}
      handlePagination={clickAction}
    />
  );
};
