import React from 'react';
import StudyBoardTemplate from './template';
import { makeMockSummarizedPost } from '../../__mocks__/client-mock-data';

export default {
  title: 'Template/StudyBoard',
  component: StudyBoardTemplate,
};

export const studyboardTemplate = (): React.ReactElement => {
  const summarizedPosts = [makeMockSummarizedPost({}), makeMockSummarizedPost({}), makeMockSummarizedPost({})];
  return <StudyBoardTemplate posts={summarizedPosts} />;
};
