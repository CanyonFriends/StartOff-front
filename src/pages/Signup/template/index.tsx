import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Style from './styled';
import { Button, Anchor, Title, Icon } from '../../../components/UI/atom';
import { BoxWithIcon } from '../../../components/UI/molecule';
import { SignupForm, AlertModal } from '../../../components/UI/organism';
import { SignupInfoType } from '../../../validator/signupValidator';
import theme from '../../../common/theme';
import { signupAPI, SignupResponseType } from '../../../api/auth';
import { signinPath } from '../../../Routes';
import { isFailed } from '../../../api/error';

function SigninPageTemplate() {
  const [modalMessage, setModalMessage] = useState('');
  const history = useHistory();

  const handleSignupAPI = async (signupInfo: SignupInfoType) => {
    const response = await signupAPI(signupInfo);
    if (isFailed<SignupResponseType>(response)) {
      setModalMessage(response.errorMsg);
      return '';
    }

    history.push(signinPath);
    return '';
  };

  const handleGithubButton = () => {};

  const handleModalCloseButton = () => {
    setModalMessage('');
  };

  return (
    <Style.Container>
      {!!modalMessage.length && <AlertModal content={modalMessage} clickCloseButton={handleModalCloseButton} />}
      <BoxWithIcon iconProps={{ icon: 'Logo', size: 'extraLarge' }} sortDirection="column">
        <Title fontsize="h1">SIGNUP</Title>
      </BoxWithIcon>
      <Button width="100%" size="large" theme="github" onClick={handleGithubButton}>
        <Icon icon="Logo" color={theme.color.color_brightness_900} />
        <Style.GithubSigninText>Github로 로그인</Style.GithubSigninText>
      </Button>
      <SignupForm handleSubmit={handleSignupAPI} />
      <Style.MoveContainer>
        <Style.YesAccountText>계정이 있다면?</Style.YesAccountText>
        <Anchor to="/signin" color={theme.color.color_primary_400}>
          로그인하기
        </Anchor>
      </Style.MoveContainer>
    </Style.Container>
  );
}

export default SigninPageTemplate;
