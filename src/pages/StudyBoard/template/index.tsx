import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Style from './styled';
import { SummarizedPostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { Button } from '../../../components/UI/atom';
import { Dropdown, SearchBox } from '../../../components/UI/molecule';
import { AlertModal, SummarizedPostItem } from '../../../components/UI/organism';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { buildCreatePostPath } from '../../../Routes';

interface StudyBoardTemplateProps {
  posts: SummarizedPostClientType[];
}

function StudyBoardTemplate({ posts }: StudyBoardTemplateProps) {
  const history = useHistory();
  const [error, setError] = useState('');
  const { isSignin } = useSelector<RootState>((state) => state.user) as UserState;

  const clickDropdownItem = () => {};

  const searchSubmit = async () => {
    return '';
  };

  const clickCreatePostButton = () => {
    if (!isSignin) {
      setError('로그인이 필요합니다');
      return;
    }

    history.push(buildCreatePostPath('study'));
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
            <Dropdown placeholder="제목" items={[]} clickItem={clickDropdownItem} />
            <SearchBox searchSubmit={searchSubmit} />
          </Style.HeaderLeft>
          <Button theme="secondary" size="medium" onClick={clickCreatePostButton}>
            글 쓰기
          </Button>
        </Style.Header>
        <Style.PostList>
          {posts.map((post) => (
            <SummarizedPostItem post={post} />
          ))}
        </Style.PostList>
      </Style.Container>
    </>
  );
}

export default StudyBoardTemplate;
