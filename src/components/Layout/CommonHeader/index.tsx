import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Style from './styled';
import { Icon, Anchor } from '../../UI/atom';
import { BoxWithIcon } from '../../UI/molecule';
import { homePath, signinPath, buildProfilePath, buildBoardPath } from '../../../Routes';
import theme from '../../../style/theme';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { actions } from '../../../redux/user';
import { getCategoriesAPI } from '../../../api/post';
import { isFailed } from '../../../api/error';

interface CategoryType {
  name: string;
  route: string;
}

function CommonHeader() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { isSignin, userId } = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await getCategoriesAPI();
    if (isFailed<string[]>(response)) {
      return;
    }
    const categories = response.map((category) => ({ name: category, route: buildBoardPath(category) }));
    setCategories(categories);
  };

  const handleLogout = () => {
    dispatch(actions.logoutRequest());
  };

  return (
    <Style.Container>
      <BoxWithIcon iconProps={{ icon: 'Logo', size: 'large' }}>
        <Style.Nav>
          {categories.map((category) => (
            <Style.NavItem key={category.name}>
              <Anchor to={category.route} size="large" bolder hoverColor={theme.color.color_primary_500}>
                {category.name}
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
