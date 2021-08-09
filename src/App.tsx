import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Routes from './Routes';
import HomePage from './pages/Home';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signup';
import CommonHeader from './components/Layout/CommonHeader';

function App() {
  return (
    <>
      <CommonHeader />
      <Switch>
        <Route exact path={Routes.homePath} component={HomePage} />
        <Route path={Routes.signinPath} component={SigninPage} />
        <Route path={Routes.signupPath} component={SignupPage} />
      </Switch>
    </>
  );
}

export default App;
