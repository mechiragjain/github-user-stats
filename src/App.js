import React from 'react';
import { Dashboard, Login, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Dashboard></Dashboard>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
