import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Routes from './Routes';
import HomePage from './pages/Home';

function App() {
  return (
    <Switch>
      <Route exact path={Routes.homePath} component={HomePage} />
    </Switch>
  );
}

export default App;
