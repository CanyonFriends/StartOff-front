import React from 'react';
import * as Style from './styled';
import { Icon, Anchor } from '../../UI/atom';
import { BoxWithIcon } from '../../UI/molecule';
import { homePath } from '../../../Routes';
import theme from '../../../common/theme';

// FIXME: 이름, 경로 변경
const menu = [
  { name: '게시판1', route: homePath },
  { name: '게시판2', route: homePath },
  { name: '게시판3', route: homePath },
];

function CommonHeader() {
  return (
    <Style.Container>
      <BoxWithIcon iconType="Logo" iconSize="large">
        <Style.Nav>
          {menu.map((item) => (
            <Style.NavItem>
              <Anchor to={item.route} size="large" bolder hoverColor={theme.color.color_primary_500}>
                {item.name}
              </Anchor>
            </Style.NavItem>
          ))}
        </Style.Nav>
      </BoxWithIcon>
      <Style.ButtonContainer>
        <Anchor to="/">
          <Icon icon="Login" size="medium" />
        </Anchor>
      </Style.ButtonContainer>
    </Style.Container>
  );
}

export default CommonHeader;
