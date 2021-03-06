import React from 'react';
import * as Style from './styled';
import ModalWrapper from '../../../Layout/ModalWrapper/index';
import { Icon, Button, Title } from '../../atom';
import theme from '../../../../style/theme';

interface AlertModalProps {
  content: string;
  isSuccess?: boolean;
  clickCloseButton: () => void;
}

function AlertModal({ content, isSuccess = false, clickCloseButton }: AlertModalProps) {
  const handleCloseButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    clickCloseButton();
  };

  return (
    <ModalWrapper clickModalOutside={clickCloseButton} isBlur>
      <Style.Container>
        <Icon
          id={isSuccess ? 'success-icon' : 'warning-icon'}
          icon={isSuccess ? 'Check' : 'Warning'}
          size="large"
          color={isSuccess ? theme.color.color_success_100 : theme.color.color_warning_100}
        />
        <Title fontsize="h2">{isSuccess ? '성공' : '실패'}</Title>
        <Style.Text>{content}</Style.Text>
        <Button onClick={handleCloseButton} width="100%" size="large">
          닫기
        </Button>
      </Style.Container>
    </ModalWrapper>
  );
}

export default AlertModal;
