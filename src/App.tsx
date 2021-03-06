import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CheckUser from './utils/CheckUser';
import * as Routes from './Routes';
import HomePage from './pages/Home';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import Board from './pages/Board';
import CreatePost from './pages/PostChange/PostCreation';
import Post from './pages/Post';
import ModifyPost from './pages/PostChange/PostEdit/index';

function App() {
  return (
    <>
      <CheckUser />
      <Switch>
        <Route exact path={Routes.homePath} component={HomePage} />
        <Route path={Routes.signinPath} component={SigninPage} />
        <Route path={Routes.signupPath} component={SignupPage} />
        <Route path={Routes.profilePath} component={ProfilePage} />
        <Route exact path={Routes.boardPath} component={Board} />
        <Route path={Routes.createPostPath} component={CreatePost} />
        <Route path={Routes.modifyPath} component={ModifyPost} />
        <Route path={Routes.postPath} component={Post} />
      </Switch>
    </>
  );
}

export default App;
