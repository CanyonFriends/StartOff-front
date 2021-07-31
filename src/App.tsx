import React from 'react';
import styled from '@emotion/styled';
import theme from './common/theme';

const Div = styled.div`
  color: ${theme.color.color_brightness_500};
`;

function App() {
  return <Div>hello-world</Div>;
}

export default App;
