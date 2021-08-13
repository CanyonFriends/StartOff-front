/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import * as Style from './styled';
import { Button, Anchor, Title, Icon } from '../../../components/UI/atom';
import { BoxWithIcon } from '../../../components/UI/molecule';
import { LoginForm, AlertModal } from '../../../components/UI/organism';
import { LoginInfoType } from '../../../validator/loginValidator';
import theme from '../../../common/theme';
import { signinAPI, isFailed, SigninResponseType } from '../../../api/user';
import { setCookie } from '../../../utils/cookie';

function SigninPageTemplate() {
  const [modalMessage, setModalMessage] = useState('');

  const handleSigninAPI = async (signinInfo: LoginInfoType) => {
    const response = await signinAPI(signinInfo);
    if (isFailed<SigninResponseType>(response)) {
      setModalMessage(response.error);
      return '';
    }
    setCookie('soc', response.access_token);

    return '';
  };

  const handleGithubButton = () => {};

  const handleModalCloseButton = () => {
    setModalMessage('');
  };

  return (
    <Style.Container>
      {!!modalMessage.length && <AlertModal content={modalMessage} clickCloseButton={handleModalCloseButton} />}
      <BoxWithIcon iconType="Logo" iconSize="extraLarge" sortDirection="column">
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
