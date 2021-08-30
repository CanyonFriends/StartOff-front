/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import StudyBoardPage from '../StudyBoard';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<StudyBoard> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<StudyBoardPage />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });
});
