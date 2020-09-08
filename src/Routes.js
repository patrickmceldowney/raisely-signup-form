import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Welcome from './containers/Welcome'

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/welcome'>
        <Welcome />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}