import React from 'react';
import * as Style from './styled';
import { SummarizedPostClientType } from '../../../../@types/client';
import { Tag, Title } from '../../atom';
import { dateToString } from '../../../../utils/date';

interface SummarizedPostItemProps {
  post: SummarizedPostClientType;
}

function SummarizedPostItem({ post }: SummarizedPostItemProps) {
  return (
    <Style.Container>
      <Style.Left>
        <Style.TitleWrapper>
          <Title fontsize="h2">{post.title}</Title>
          {post.currentPeople && post.maxPeople && (
            <Style.FinishTag isFinished={post.currentPeople === post.maxPeople}>
              {post.currentPeople} / {post.maxPeople}
            </Style.FinishTag>
          )}
        </Style.TitleWrapper>
        <Style.SkillWrapper>
          {post.postSkills.map((skill) => (
            <Style.SkillItem key={skill.skillId}>
              <Tag
                key={skill.skillId}
                id={skill.skillId}
                name={skill.skillName}
                textColor={skill.textColor}
                color={skill.color}
              />
            </Style.SkillItem>
          ))}
        </Style.SkillWrapper>
      </Style.Left>
      <Style.Right>
        <Style.Nickname>{post.nickname}</Style.Nickname>
        <Style.Date>{dateToString(post.createAt)}</Style.Date>
      </Style.Right>
    </Style.Container>
  );
}

export default SummarizedPostItem;
