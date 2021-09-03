/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import SearchBox from '../SearchBox';

describe('Component/Molecule/SearchBox', () => {
  it('렌더링 테스트', () => {
    const handleSubmit = async () => '';
    const component = render(<SearchBox searchSubmit={handleSubmit} />);

    component.getByLabelText('search-icon');
    component.getByLabelText('search-input');
    component.getByText('검색');
  });

  it('submit 테스트', () => {
    let nickname = 'shellboy';
    const handleSubmit = async (values: string) => {
      nickname = values;
      return '';
    };
    const component = render(<SearchBox searchSubmit={handleSubmit} />);
    const searchButton = component.getByText('검색');
    const searchInput = component.getByLabelText('search-input');

    fireEvent.change(searchInput, { target: { value: 'tallmurf' } });
    fireEvent.click(searchButton);
    waitFor(() => {
      expect(nickname).toBe('tallmurf');
    });
  });

  it('제출 시 에러 발생 경우 테스트', async () => {
    const handleSubmit = async () => 'error';
    const component = render(<SearchBox searchSubmit={handleSubmit} />);
    const searchButton = component.getByText('검색');

    fireEvent.click(searchButton);
    const errorText = await component.findByText('error');
    expect(errorText.tagName).toBe('P');
  });

  it('모달 창 닫기', async () => {
    const handleSubmit = async () => 'error';
    const component = render(<SearchBox searchSubmit={handleSubmit} />);
    const searchButton = component.getByText('검색');

    fireEvent.click(searchButton);
    const closeModalButton = await component.findByText('닫기');
    fireEvent.click(closeModalButton);
  });
});
