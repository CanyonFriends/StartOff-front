import React from 'react';
import * as Style from './styled';
import InputField, { InputFieldProps } from '../../molecule/InputField';
import { Button } from '../../atom';
import theme from '../../../../common/theme';
import useForm from '../../../../hooks/useForm';
import loginValidator, { LoginInfoType } from '../../../../validator/loginValidator';

export interface LoginFormProps {
  handleSubmit: ({ id, pw }: LoginInfoType) => Promise<string>;
}

function LoginForm({ handleSubmit }: LoginFormProps) {
  const { values, error, handleChange, handleSubmitWithErrorControl } = useForm<LoginInfoType>({
    onSubmit: handleSubmit,
    initialState: { id: '', pw: '' },
    validator: loginValidator,
  });

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, id: event.target.value });
  };

  const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, pw: event.target.value });
  };

  const idFormInfo: InputFieldProps = {
    group: 'email',
    sortDirection: 'column',
    labelProps: { content: 'email', color: theme.color.color_primary_400 },
    inputProps: { value: values.id, type: 'email', onChange: handleIdChange },
  };

  const pwFormInfo: InputFieldProps = {
    group: 'password',
    sortDirection: 'column',
    labelProps: { content: 'password', color: theme.color.color_primary_400 },
    inputProps: { value: values.pw, type: 'password', onChange: handlePwChange },
  };

  return (
    <Style.Container onSubmit={handleSubmitWithErrorControl}>
      <Style.InputWrapper>
        <InputField {...idFormInfo} />
      </Style.InputWrapper>
      <Style.InputWrapper>
        <InputField {...pwFormInfo} />
      </Style.InputWrapper>
      <Style.Error>{error || ''}</Style.Error>
      <Button width="100%" theme="primary" size="large">
        로그인
      </Button>
    </Style.Container>
  );
}

export default LoginForm;
