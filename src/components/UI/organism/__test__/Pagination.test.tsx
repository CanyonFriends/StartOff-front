/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import Pagination from '../Pagination';

let number = 0;
beforeEach(() => {
  number = 0;
});

describe('Component/Organism/Pagination', () => {
  const onClick = (pageNumber: number) => {
    number = pageNumber;
  };

  describe('페이지 개수 5, 현재 페이지 3', () => {
    it('렌더링', () => {
      const component = render(
        <Pagination totalCount={5} currentPage={3} showingPage={5} onClickPageButton={onClick} />,
      );

      component.getByText('1');
      component.getByText('2');
      component.getByText('3');
      component.getByText('4');
      component.getByText('5');
    });

    it('이전 / 이후 화살표 클릭', async () => {
      const component = render(
        <Pagination totalCount={5} currentPage={3} showingPage={5} onClickPageButton={onClick} />,
      );

      const beforeButton = component.getByLabelText('before-page-icon');
      const nextButton = component.getByLabelText('next-page-icon');
      waitFor(() => {
        fireEvent.click(beforeButton);
        expect(number).toBe(2);
        fireEvent.click(nextButton);
        expect(number).toBe(3);
      });
    });

    it('페이지 클릭', async () => {
      const component = render(
        <Pagination totalCount={5} currentPage={3} showingPage={5} onClickPageButton={onClick} />,
      );

      const fourButton = component.getByText('4');
      await waitFor(() => {
        fireEvent.click(fourButton);
        expect(number).toBe(4);
      });
    });

    it('자기자신 클릭시 반응 없음', async () => {
      const component = render(
        <Pagination totalCount={5} currentPage={3} showingPage={5} onClickPageButton={onClick} />,
      );

      const threeButton = component.getByText('3');
      await waitFor(() => {
        fireEvent.click(threeButton);
        expect(number).toBe(0);
      });
    });
  });

  describe('페이지 개수 12, 현재 페이지 2', () => {
    it('렌더링', () => {
      const component = render(
        <Pagination totalCount={12} currentPage={2} showingPage={5} onClickPageButton={onClick} />,
      );

      component.getByText('1');
      component.getByText('2');
      component.getByText('3');
      component.getByText('4');
      component.getByText('5');
      component.getByText('...');
    });

    it('마지막 페이지로 가기', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={2} showingPage={5} onClickPageButton={onClick} />,
      );

      await waitFor(() => {
        const twelveButton = component.getByText('12');
        fireEvent.click(twelveButton);
        expect(number).toBe(12);
      });
    });

    it('다음 숫자 클릭', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={2} showingPage={5} onClickPageButton={onClick} />,
      );

      const threeButton = component.getByText('3');
      await waitFor(() => {
        fireEvent.click(threeButton);
        expect(number).toBe(3);
      });
    });
  });

  describe('페이지 개수 12, 현재 페이지 7', () => {
    it('렌더링', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={7} showingPage={5} onClickPageButton={onClick} />,
      );

      component.getByText('5');
      component.getByText('6');
      component.getByText('7');
      component.getByText('8');
      component.getByText('9');
      const spreadText = component.getAllByText('...');
      expect(spreadText.length).toBe(2);
    });

    it('이전 이후 페이지 숫자 클릭', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={7} showingPage={5} onClickPageButton={onClick} />,
      );
      const eightButton = component.getByText('8');

      await waitFor(() => {
        fireEvent.click(eightButton);
        expect(number).toBe(8);
        const sixButton = component.getByText('6');
        fireEvent.click(sixButton);
        expect(number).toBe(6);
      });
    });
  });

  describe('페이지 개수 12, 현재 페이지 11', () => {
    it('렌더링', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={11} showingPage={5} onClickPageButton={onClick} />,
      );

      component.getByText('8');
      component.getByText('9');
      component.getByText('10');
      component.getByText('11');
      component.getByText('12');
      component.getByText('...');
    });

    it('첫 페이지로 가기', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={11} showingPage={5} onClickPageButton={onClick} />,
      );

      await waitFor(() => {
        const oneButton = component.getByText('1');
        fireEvent.click(oneButton);
        expect(number).toBe(1);
      });
    });

    it('이전 숫자 클릭', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={11} showingPage={5} onClickPageButton={onClick} />,
      );
      const tenButton = component.getByText('10');

      await waitFor(() => {
        fireEvent.click(tenButton);
        expect(number).toBe(10);
      });
    });

    it('다음 숫자 클릭', async () => {
      const component = render(
        <Pagination totalCount={12} currentPage={11} showingPage={5} onClickPageButton={onClick} />,
      );
      const twelveButton = component.getByText('12');

      await waitFor(() => {
        fireEvent.click(twelveButton);
        expect(number).toBe(12);
      });
    });
  });
});
