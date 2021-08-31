import React from 'react';
import ModalWrapper from '../../../Layout/ModalWrapper';
import { Button, Title } from '../../atom';
import { InputField } from '../../molecule';
import * as Style from './styled';
import useForm from '../../../../hooks/useForm';
import { InputFieldProps } from '../../molecule/InputField/index';
import updatePasswordValidator, { UpdatePasswordValidatorType } from '../../../../validator/updatePasswordValidator';
import theme from '../../../../style/theme';

interface AccountInfoModalProps {
  handleCloseModal: () => void;
  changePassword: (data: UpdatePasswordValidatorType) => Promise<string>;
  deleteUser: () => void;
}

function AccountInfoModal({ handleCloseModal, changePassword, deleteUser }: AccountInfoModalProps) {
  const { values, error, handleChange, handleSubmitWithErrorControl } = useForm<UpdatePasswordValidatorType>({
    onSubmit: changePassword,
    initialState: { currentPW: '', afterPW: '', confirmPW: '' },
    validator: updatePasswordValidator,
  });

  const handleCurrentPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, currentPW: event.target.value });
  };

  const handleAfterPW = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, afterPW: event.target.value });
  };

  const handleConfirmPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, confirmPW: event.target.value });
  };

  const currentPWInputInfo: InputFieldProps = {
    group: 'currentpw',
    sortDirection: 'column',
    labelProps: { content: 'current password', color: theme.color.color_primary_400 },
    inputProps: { value: values.currentPW, type: 'password', onChange: handleCurrentPW },
  };
  const afterPWInputInfo: InputFieldProps = {
    group: 'afterpw',
    sortDirection: 'column',
    labelProps: { content: 'after password', color: theme.color.color_primary_400 },
    inputProps: { value: values.afterPW, type: 'password', onChange: handleAfterPW },
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
            <InputField {...currentPWInputInfo} />
          </Style.InputWrapper>
          <Style.InputWrapper>
            <InputField {...afterPWInputInfo} />
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
