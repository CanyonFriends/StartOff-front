import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CheckUser from './utils/CheckUser';
import * as Routes from './Routes';
import HomePage from './pages/Home';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import StudyBoard from './pages/StudyBoard/index';

function App() {
  return (
    <>
      <CheckUser />
      <Switch>
        <Route exact path={Routes.homePath} component={HomePage} />
        <Route path={Routes.signinPath} component={SigninPage} />
        <Route path={Routes.signupPath} component={SignupPage} />
        <Route path={Routes.profilePath} component={ProfilePage} />
        <Route path={Routes.studyBoardPath} component={StudyBoard} />
      </Switch>
    </>
  );
}

export default App;
