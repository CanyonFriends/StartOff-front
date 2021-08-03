import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '.';
import Icon from '../Icon';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Atom/Button',
  component: Button,
  decorators: [withKnobs],
};

const onClickAction = action('click');

export const primaryButton = (): React.ReactElement => {
  const label = text('BUTTON', 'PRIMARY');
  return (
    <StyleWrapper>
      <div>
        <div className="description">Small</div>
        <Button theme="primary" size="small" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">Medium</div>
        <Button theme="primary" size="medium" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">Large</div>
        <Button theme="primary" size="large" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">Large</div>
        <Button theme="primary" size="extraLarge" onClick={onClickAction}>
          {label}
        </Button>
      </div>
    </StyleWrapper>
  );
};

export const secondaryButton = (): React.ReactElement => {
  const label = text('BUTTON', 'SECONDARY');
  return (
    <StyleWrapper>
      <div>
        <div className="description">Small</div>
        <Button theme="secondary" size="small" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">Medium</div>
        <Button theme="secondary" size="medium" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">Large</div>
        <Button theme="secondary" size="large" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">Large</div>
        <Button theme="secondary" size="extraLarge" onClick={onClickAction}>
          {label}
        </Button>
      </div>
    </StyleWrapper>
  );
};

export const customWidthButton = (): React.ReactElement => {
  const label = text('BUTTON', 'PRIMARY');
  return (
    <StyleWrapper>
      <div>
        <div className="description">width 50%</div>
        <Button theme="primary" size="medium" width="50%" onClick={onClickAction}>
          {label}
        </Button>
      </div>
      <div>
        <div className="description">width 300px</div>
        <Button theme="primary" size="medium" width="300px" onClick={onClickAction}>
          {label}
        </Button>
      </div>
    </StyleWrapper>
  );
};

export const linkButton = (): React.ReactElement => {
  const label = text('BUTTON', 'LINK');
  return (
    <Button theme="primary" size="medium" to="/signin" onClick={onClickAction}>
      {label}
    </Button>
  );
};

export const iconOnlyButton = (): React.ReactElement => {
  return (
    <Button iconOnly>
      <Icon icon="LeftChevron" size="large" />
    </Button>
  );
};
