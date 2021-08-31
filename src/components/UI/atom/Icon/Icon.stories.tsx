import React from 'react';
import Icon from '.';
import StyleWrapper from '../../../../style/styleWrapper';

export default {
  title: 'Atom/Icon',
  component: Icon,
};

export const iconSize = (): React.ReactElement => {
  return (
    <StyleWrapper>
      <div>
        <div className="description">Small</div>
        <Icon icon="LeftChevron" size="small" />
      </div>
      <div>
        <div className="description">Medium</div>
        <Icon icon="LeftChevron" size="medium" />
      </div>
      <div>
        <div className="description">Large</div>
        <Icon icon="LeftChevron" size="large" />
      </div>
      <div>
        <div className="description">extraLarge</div>
        <Icon icon="LeftChevron" size="extraLarge" />
      </div>
    </StyleWrapper>
  );
};

export const iconType = (): React.ReactElement => {
  return (
    <StyleWrapper>
      <div>
        <div className="description">LeftChevron</div>
        <Icon icon="LeftChevron" size="medium" />
      </div>
      <div>
        <div className="description">Login</div>
        <Icon icon="Login" size="medium" />
      </div>
      <div>
        <div className="description">Logo</div>
        <Icon icon="Logo" size="medium" />
      </div>
      <div>
        <div className="description">Logout</div>
        <Icon icon="Logout" size="medium" />
      </div>
    </StyleWrapper>
  );
};
