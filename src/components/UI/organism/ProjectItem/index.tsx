import React from 'react';
import * as Style from './styled';
import { ProjectType } from '../../../../@types/client';
import { Icon, Title, Paragraph, Tag, Anchor } from '../../atom';
import { dateToString } from '../../../../utils/date';
import { BoxWithIcon } from '../../molecule';

interface ProjectItemProps {
  project: ProjectType;
  editableAuthority: boolean;
  handleDeleteItem: () => void;
  handleModifyItem: () => void;
}

function ProjectItem({ project, editableAuthority, handleDeleteItem, handleModifyItem }: ProjectItemProps) {
  return (
    <Style.Container>
      <Style.Header>
        <Style.Top>
          <Title fontsize="h3">{project.title}</Title>
          {editableAuthority && (
            <Style.IconWrapper>
              <Icon icon="Pencil" />
              <Icon icon="TrashCan" />
            </Style.IconWrapper>
          )}
        </Style.Top>
        <Style.DateWrapper>
          {dateToString(project.startDate)} ~ {dateToString(project.endDate)}
        </Style.DateWrapper>
        <Style.IntroduceWrapper>
          <Paragraph content={project.introduce} size="large" />
        </Style.IntroduceWrapper>
        <Style.SkillWrapper>
          {project.projectSklls.map((skill) => (
            <Style.SkillItem>
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
      </Style.Header>
      <Style.Left>
        <BoxWithIcon isContinuous iconProps={{ icon: 'Logo' }}>
          <Anchor to={project.githubUrl}>{project.githubUrl}</Anchor>
        </BoxWithIcon>
        <BoxWithIcon isContinuous iconProps={{ icon: 'Home' }}>
          <Anchor to={project.deployUrl}>{project.deployUrl}</Anchor>
        </BoxWithIcon>
      </Style.Left>
      <Style.Right>
        <Paragraph content={project.content} size="medium" />
      </Style.Right>
    </Style.Container>
  );
}

export default ProjectItem;
