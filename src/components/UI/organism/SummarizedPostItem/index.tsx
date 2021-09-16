import React from 'react';
import * as Style from './styled';
import { SummarizedPostClientType } from '../../../../@types/client';
import { Title } from '../../atom';
import { dateToString } from '../../../../utils/date';
import { SkillList } from '../../molecule';

interface SummarizedPostItemProps {
  post: SummarizedPostClientType;
}

function SummarizedPostItem({ post }: SummarizedPostItemProps) {
  return (
    <Style.Container>
      <Style.Left>
        <Style.TitleWrapper>
          <Title fontsize="h2">{post.title}</Title>
          <Style.FinishTag isFinished={post.currentPeople === post.maxPeople}>
            {!post.maxPeople ? '제한없음' : `${post.currentPeople} / ${post.maxPeople}`}
          </Style.FinishTag>
        </Style.TitleWrapper>
        <SkillList skillList={post.postSkills} />
      </Style.Left>
      <Style.Right>
        <Style.Nickname>{post.nickname}</Style.Nickname>
        <Style.Date>{dateToString(post.createAt)}</Style.Date>
      </Style.Right>
    </Style.Container>
  );
}

export default SummarizedPostItem;
