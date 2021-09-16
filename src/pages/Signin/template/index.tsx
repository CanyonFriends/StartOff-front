import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Style from './styled';
import { Button, Anchor, Title, Icon } from '../../../components/UI/atom';
import { BoxWithIcon } from '../../../components/UI/molecule';
import { LoginForm, AlertModal } from '../../../components/UI/organism';
import { LoginInfoType } from '../../../validator/loginValidator';
import theme from '../../../style/theme';
import { actions } from '../../../redux/user';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/user/types';
import { homePath } from '../../../Routes';

function SigninPageTemplate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalMessage, setModalMessage] = useState('');
  const { error, isSignin } = useSelector<RootState>((state) => state.user) as UserState;

  useEffect(() => {
    setModalMessage(error);
  }, [error]);

  useEffect(() => {
    if (isSignin) {
      history.push(homePath);
    }
  }, [isSignin]);

  const handleSigninAPI = async (signinInfo: LoginInfoType) => {
    dispatch(actions.loginRequest(signinInfo));
    return '';
  };

  const handleGithubButton = () => {};

  const handleModalCloseButton = () => {
    dispatch(actions.clearError());
    setModalMessage('');
  };

  return (
    <Style.Container>
      {!!modalMessage.length && <AlertModal content={error} clickCloseButton={handleModalCloseButton} />}
      <BoxWithIcon iconProps={{ icon: 'Logo', size: 'extraLarge' }} sortDirection="column">
        <Title fontsize="h1">LOGIN</Title>
      </BoxWithIcon>
      <LoginForm handleSubmit={handleSigninAPI} />
      <Style.MoveContainer>
        <Style.NoAccountText>아직 계정이 없으시다면?</Style.NoAccountText>
        <Anchor to="/signup" color={theme.color.color_primary_400}>
          계정 만들기
        </Anchor>
      </Style.MoveContainer>
      <Button width="100%" size="large" theme="github" onClick={handleGithubButton}>
        <Icon icon="Logo" color={theme.color.color_brightness_900} />
        <Style.GithubSigninText>Github로 로그인</Style.GithubSigninText>
      </Button>
    </Style.Container>
  );
}

export default SigninPageTemplate;
