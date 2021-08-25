import React from 'react';
import ModalWrapper from '../../../Layout/ModalWrapper';
import { Button, Title } from '../../atom';
import { InputField } from '../../molecule';
import * as Style from './styled';
import useForm from '../../../../hooks/useForm';
import { InputFieldProps } from '../../molecule/InputField/index';
import updatePasswordValidator, { UpdatePasswordValidatorType } from '../../../../validator/updatePasswordValidator';
import theme from '../../../../common/theme';

interface AccountInfoModalProps {
  handleCloseModal: () => void;
  changePassword: (data: UpdatePasswordValidatorType) => Promise<string>;
  deleteUser: () => void;
}

function AccountInfoModal({ handleCloseModal, changePassword, deleteUser }: AccountInfoModalProps) {
  const { values, error, handleChange, handleSubmitWithErrorControl } = useForm({
    onSubmit: changePassword,
    initialState: { pw: '', confirmPW: '' },
    validator: updatePasswordValidator,
  });

  const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, pw: event.target.value });
  };

  const handleConfirmPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, confirmPW: event.target.value });
  };

  const pwInputInfo: InputFieldProps = {
    group: 'pw',
    sortDirection: 'column',
    labelProps: { content: 'password', color: theme.color.color_primary_400 },
    inputProps: { value: values.pw, type: 'password', onChange: handlePwChange },
  };
  const confirmPWInputInfo: InputFieldProps = {
    group: 'confirmpw',
    sortDirection: 'column',
    labelProps: { content: 'confirm password', color: theme.color.color_primary_400 },
    inputProps: { value: values.confirmPW, type: 'password', onChange: handleConfirmPwChange },
  };
  return (
    <ModalWrapper clickModalOutside={handleCloseModal} isBlur>
      <Style.Container>
        <Style.Form onSubmit={handleSubmitWithErrorControl}>
          <Title fontsize="h3">비밀번호 변경하기</Title>
          <Style.InputWrapper>
            <InputField {...pwInputInfo} />
          </Style.InputWrapper>
          <Style.InputWrapper>
            <InputField {...confirmPWInputInfo} />
          </Style.InputWrapper>
          <Style.Error>{error || ''}</Style.Error>
          <Button width="100%" size="medium">
            변경하기
          </Button>
        </Style.Form>
        <Style.Line />
        <Title fontsize="h4">탈퇴하기</Title>
        <Button theme="secondary" width="100%" size="medium" onClick={deleteUser}>
          탈퇴하기
        </Button>
      </Style.Container>
    </ModalWrapper>
  );
}

export default AccountInfoModal;
