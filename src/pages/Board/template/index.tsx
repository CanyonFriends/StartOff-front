import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Style from './styled';
import { SummarizedPostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { Button } from '../../../components/UI/atom';
import { Dropdown, SearchBox } from '../../../components/UI/molecule';
import { AlertModal, Pagination, SummarizedPostItem } from '../../../components/UI/organism';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { buildCreatePostPath, buildPostPath } from '../../../Routes';

interface BoardTemplateProps {
  posts: SummarizedPostClientType[];
  board: string;
  totalPage: number;
  currentPage: number;
  getPosts: (query: string, type?: string[]) => Promise<void>;
  handlePagination: (pageNumber: number) => void;
}

const DROPDOWN_ITEM: { [name: string]: string } = {
  제목: 'title',
  내용: 'content',
  태그: 'skill',
};
function BoardTemplate({ posts, board, totalPage, currentPage, handlePagination, getPosts }: BoardTemplateProps) {
  const history = useHistory();
  const [error, setError] = useState('');
  const [dropdownItems, setDropdownItems] = useState(
    Object.keys(DROPDOWN_ITEM).map((item) => ({ text: item, id: item, selected: false })),
  );
  const { isSignin } = useSelector<RootState>((state) => state.user) as UserState;

  const clickDropdownItem = (id: string) => {
    const updatedSelectedDropdownItems = dropdownItems.map((item) => {
      if (item.id === id) item.selected = !item.selected;
      return item;
    });
    setDropdownItems(updatedSelectedDropdownItems);
  };

  const searchSubmit = async (query: string) => {
    const selectedItems = dropdownItems.filter((item) => item.selected).map((item) => DROPDOWN_ITEM[item.text]);
    await getPosts(query, selectedItems);

    return '';
  };

  const clickCreatePostButton = () => {
    if (!isSignin) {
      setError('로그인이 필요합니다');
      return;
    }

    history.push(buildCreatePostPath(board));
  };

  const closeAlertModal = () => {
    setError('');
  };

  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={closeAlertModal} />}
      <CommonHeader />
      <Style.Container>
        <Style.Header>
          <Style.HeaderLeft>
            <Dropdown
              placeholder={
                dropdownItems
                  .filter((item) => item.selected)
                  .map((item) => item.text)
                  .join('. ') || '카테고리 선택'
              }
              items={dropdownItems}
              clickItem={clickDropdownItem}
            />
            <SearchBox searchSubmit={searchSubmit} />
          </Style.HeaderLeft>
          <Button theme="secondary" size="medium" onClick={clickCreatePostButton}>
            글 쓰기
          </Button>
        </Style.Header>
        <Style.PostList>
          {posts.map((post) => (
            <Link to={buildPostPath(board, post.postId)} key={post.postId}>
              <SummarizedPostItem post={post} />
            </Link>
          ))}
        </Style.PostList>
        <Pagination totalCount={totalPage} currentPage={currentPage} onClickPageButton={handlePagination} />
      </Style.Container>
    </>
  );
}

export default BoardTemplate;
