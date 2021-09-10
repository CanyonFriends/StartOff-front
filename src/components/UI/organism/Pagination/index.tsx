/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Icon } from '../../atom';
import * as Style from './styled';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  showingPage?: number;
  onClickPageButton: (pageNumber: number) => void;
}

function Pagination({ totalCount, showingPage = 5, currentPage, onClickPageButton }: PaginationProps) {
  const isFirstShowing = currentPage >= Math.ceil(showingPage / 2) + 1;
  const isLastShowing = currentPage < totalCount - Math.ceil(showingPage / 2) + 1;

  return (
    <Style.Container>
      <Style.PageButton onClick={() => onClickPageButton(currentPage === 1 ? 1 : currentPage - 1)}>
        <Icon id="before-page-icon" icon="LeftChevron" />
      </Style.PageButton>
      {totalCount <= showingPage ? (
        <Style.CenterWrapper>
          {new Array(totalCount).fill(0).map((_, index) => (
            <Style.PageButton
              key={index + 1}
              onClick={index + 1 === currentPage ? undefined : () => onClickPageButton(index + 1)}
              selected={index + 1 === currentPage}
            >
              {index + 1}
            </Style.PageButton>
          ))}
        </Style.CenterWrapper>
      ) : (
        <>
          {isFirstShowing ? (
            <>
              <Style.PageButton onClick={() => onClickPageButton(1)}>1</Style.PageButton>
              <Style.Spread>...</Style.Spread>
            </>
          ) : (
            <>
              <Style.BlankButton> </Style.BlankButton>
              <Style.BlankButton> </Style.BlankButton>
            </>
          )}
          <Style.CenterWrapper>
            {!isFirstShowing && (
              <>
                {new Array(currentPage - 1).fill(0).map((_, index) => (
                  <Style.PageButton key={index + 1} onClick={() => onClickPageButton(index + 1)}>
                    {index + 1}
                  </Style.PageButton>
                ))}
                <Style.PageButton selected>{currentPage}</Style.PageButton>
                {new Array(showingPage - currentPage).fill(0).map((_, index) => (
                  <Style.PageButton
                    key={currentPage + index + 1}
                    onClick={() => onClickPageButton(currentPage + index + 1)}
                  >
                    {currentPage + index + 1}
                  </Style.PageButton>
                ))}
              </>
            )}
            {isFirstShowing && isLastShowing && (
              <>
                {new Array(Math.floor(showingPage / 2)).fill(0).map((_, index) => (
                  <Style.PageButton
                    key={currentPage - showingPage + index + 3}
                    onClick={() => onClickPageButton(currentPage - showingPage + index + 3)}
                  >
                    {currentPage - showingPage + index + 3}
                  </Style.PageButton>
                ))}
                <Style.PageButton selected>{currentPage}</Style.PageButton>
                {new Array(Math.floor(showingPage / 2)).fill(0).map((_, index) => (
                  <Style.PageButton
                    key={currentPage + index + 1}
                    onClick={() => onClickPageButton(currentPage + index + 1)}
                  >
                    {currentPage + index + 1}
                  </Style.PageButton>
                ))}
              </>
            )}
            {!isLastShowing && (
              <>
                {new Array(showingPage - (totalCount - currentPage) - 1).fill(0).map((_, index) => (
                  <Style.PageButton
                    key={currentPage - (showingPage - (totalCount - currentPage) - 1) + index}
                    onClick={() => onClickPageButton(currentPage - showingPage + index + 2)}
                  >
                    {currentPage - (showingPage - (totalCount - currentPage) - 1) + index}
                  </Style.PageButton>
                ))}
                <Style.PageButton selected>{currentPage}</Style.PageButton>
                {new Array(totalCount - currentPage).fill(0).map((_, index) => (
                  <Style.PageButton
                    key={currentPage + index + 1}
                    onClick={() => onClickPageButton(currentPage + index + 1)}
                  >
                    {currentPage + index + 1}
                  </Style.PageButton>
                ))}
              </>
            )}
          </Style.CenterWrapper>
          {isLastShowing ? (
            <>
              <Style.Spread>...</Style.Spread>
              <Style.PageButton onClick={() => onClickPageButton(totalCount)}>{totalCount}</Style.PageButton>
            </>
          ) : (
            <>
              <Style.BlankButton> </Style.BlankButton>
              <Style.BlankButton> </Style.BlankButton>
            </>
          )}
        </>
      )}
      <Style.PageButton onClick={() => onClickPageButton(currentPage === totalCount ? totalCount : currentPage + 1)}>
        <Icon id="next-page-icon" icon="RightChevron" />
      </Style.PageButton>
    </Style.Container>
  );
}

export default Pagination;
