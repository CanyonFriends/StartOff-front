import React from 'react';
import * as Style from './styled';
import { SummarizedPostClientType } from '../../../@types/client';
import CommonHeader from '../../../components/Layout/CommonHeader';
import { Button } from '../../../components/UI/atom';
import { Dropdown, SearchBox } from '../../../components/UI/molecule';
import { SummarizedPostItem } from '../../../components/UI/organism';

interface StudyBoardTemplateProps {
  posts: SummarizedPostClientType[];
}

function StudyBoardTemplate({ posts }: StudyBoardTemplateProps) {
  const clickDropdownItem = () => {};

  const searchSubmit = async () => {
    return '';
  };

  return (
    <>
      <CommonHeader />
      <Style.Container>
        <Style.Header>
          <Style.HeaderLeft>
            <Dropdown placeholder="제목" items={[]} clickItem={clickDropdownItem} />
            <SearchBox searchSubmit={searchSubmit} />
          </Style.HeaderLeft>
          <Button theme="secondary" size="medium">
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
