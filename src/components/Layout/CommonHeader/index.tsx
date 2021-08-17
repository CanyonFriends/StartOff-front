import React from 'react';
import { useSelector } from 'react-redux';
import * as Style from './styled';
import { Icon, Anchor } from '../../UI/atom';
import { BoxWithIcon } from '../../UI/molecule';
import { homePath, signinPath } from '../../../Routes';
import theme from '../../../common/theme';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';

// FIXME: 이름, 경로 변경
const menu = [
  { name: '게시판1', route: homePath },
  { name: '게시판2', route: homePath },
  { name: '게시판3', route: homePath },
];

function CommonHeader() {
  const { isSignin } = useSelector<RootState>((state) => state.user) as UserState;

  return (
    <Style.Container>
      <BoxWithIcon iconType="Logo" iconSize="large">
        <Style.Nav>
          {menu.map((item) => (
            <Style.NavItem key={item.name}>
              <Anchor to={item.route} size="large" bolder hoverColor={theme.color.color_primary_500}>
                {item.name}
              </Anchor>
            </Style.NavItem>
          ))}
        </Style.Nav>
      </BoxWithIcon>
      <Style.ButtonContainer singleButton={!isSignin}>
        {isSignin && (
          <Anchor to="/profile">
            <Icon icon="Profile" size="medium" />
          </Anchor>
        )}
        <Anchor to={isSignin ? homePath : signinPath}>
          <Icon icon={isSignin ? 'Logout' : 'Login'} size="medium" />
        </Anchor>
      </Style.ButtonContainer>
    </Style.Container>
  );
}

export default CommonHeader;
