import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import List from './List';
import Login from './Login';
import Register from './Register';
import Add from './Add';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default () => (
  <Switch>
    <Route path='/list' component={List} />
    <Route path='/add' component={Add} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Redirect path='/' to='/list' />
  </Switch>
);
