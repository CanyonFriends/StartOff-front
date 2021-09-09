import React from 'react';
import Markdown from 'markdown-to-jsx';
import * as Style from './styled';
import { SkillClientType } from '../../../../@types/client';
import { Button, Tag, Title } from '../../atom';

interface PostTemplateProps {
  editableAuthority: boolean;
  title: string;
  content: string;
  currentPeople: number;
  maxPeople: number;
  postSkills: SkillClientType[];
  nickname: string;
  handleModifyPost: () => void;
  handleDeletePost: () => void;
}

function PostTemplate({
  editableAuthority,
  title,
  content,
  currentPeople,
  maxPeople,
  postSkills,
  nickname,
  handleModifyPost,
  handleDeletePost,
}: PostTemplateProps) {
  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderLeft>
          <Title>{title}</Title>
          <Style.FinishTag isFinished={currentPeople === maxPeople}>
            {!maxPeople ? '제한없음' : `${currentPeople} / ${maxPeople}`}
          </Style.FinishTag>
        </Style.HeaderLeft>
        <Style.HeaderRight>
          {editableAuthority ? (
            <>
              <Button size="medium" onClick={handleModifyPost}>
                수정하기
              </Button>
              <Button theme="secondary" size="medium" onClick={handleDeletePost}>
                삭제하기
              </Button>
            </>
          ) : (
            nickname
          )}
        </Style.HeaderRight>
      </Style.Header>
      <Style.TagList>
        {postSkills.map((skill) => (
          <Style.TagItem key={skill.skillId}>
            <Tag id={skill.skillId} name={skill.skillName} textColor={skill.textColor} color={skill.color} />
          </Style.TagItem>
        ))}
      </Style.TagList>
      <Style.ContentWrapper>
        <Markdown>{content}</Markdown>
      </Style.ContentWrapper>
    </Style.Container>
  );
}

export default PostTemplate;
