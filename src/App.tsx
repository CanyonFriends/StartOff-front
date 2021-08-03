import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Routes from './Routes';
import HomePage from './pages/Home';
import CommonHeader from './components/Layout/CommonHeader';

function App() {
  return (
    <>
      <CommonHeader />
      <Switch>
        <Route exact path={Routes.homePath} component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
