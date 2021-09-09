/**
 * @jest-environment jsdom
 */
import React from 'react';
import theme from '../../../../style/theme';
import { render } from '../../../../test-utils';
import { dateToString } from '../../../../utils/date';
import { makeMockSummarizedPost } from '../../../../__mocks__/client-mock-data';
import SummarizedPostItem from '../SummarizedPostItem';

describe('Component/Organism/SummarizedPostItem', () => {
  it('렌더링 테스트(현재인원 != 최대인원', () => {
    const post = makeMockSummarizedPost({});
    const component = render(<SummarizedPostItem post={post} />);

    component.getByText(post.title);
    component.getByText(post.nickname);
    component.getByText(dateToString(post.createAt));
    component.getByText(post.postSkills[0].skillName);
    component.getByText(post.postSkills[1].skillName);
    const people = component.getByText(`${post.currentPeople} / ${post.maxPeople}`);
    expect(people).toHaveStyle({
      backgroundColor: theme.color.color_success_100,
    });
  });

  it('렌더링 테스트(현재인원 == 최대인원', () => {
    const post = makeMockSummarizedPost({ currentPeople: 10, maxPeople: 10 });
    const component = render(<SummarizedPostItem post={post} />);

    component.getByText(post.title);
    component.getByText(post.nickname);
    component.getByText(dateToString(post.createAt));
    component.getByText(post.postSkills[0].skillName);
    component.getByText(post.postSkills[1].skillName);
    const people = component.getByText(`${post.currentPeople} / ${post.maxPeople}`);
    expect(people).toHaveStyle({
      backgroundColor: theme.color.color_warning_100,
    });
  });
});
