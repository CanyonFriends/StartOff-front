import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Style from './styled';
import { Icon, Anchor } from '../../UI/atom';
import { BoxWithIcon } from '../../UI/molecule';
import { homePath, signinPath, buildProfilePath, buildBoardPath } from '../../../Routes';
import theme from '../../../style/theme';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { actions } from '../../../redux/user';

// FIXME: 이름, 경로 변경
const menu = [
  { name: '스터디', route: buildBoardPath('study') },
  { name: '자유게시판', route: buildBoardPath('free') },
];

function CommonHeader() {
  const dispatch = useDispatch();
  const { isSignin, userId } = useSelector<RootState>((state) => state.user) as UserState;

  const handleLogout = () => {
    dispatch(actions.logoutRequest());
  };

  return (
    <Style.Container>
      <BoxWithIcon iconProps={{ icon: 'Logo', size: 'large' }}>
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
          <Anchor to={buildProfilePath(userId)}>
            <Icon icon="Profile" size="medium" />
          </Anchor>
        )}
        <Anchor to={isSignin ? homePath : signinPath}>
          <Icon icon={isSignin ? 'Logout' : 'Login'} size="medium" onClick={isSignin ? handleLogout : undefined} />
        </Anchor>
      </Style.ButtonContainer>
    </Style.Container>
  );
}

export default CommonHeader;
