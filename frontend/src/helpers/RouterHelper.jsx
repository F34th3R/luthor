import React from 'react'
import { Route } from 'react-router-dom'

import {
  studentRoute,
  monitorRoute,
  guardRoute,
  preceptorRoutes,
  globalRoutes
} from '../routes'

import { Login } from '../pages/Login'

export const RouterHelper = ({ user }) => {
  return (
    <>
      <Route exact path="/login" component={Login} />
      {globalRoutes.map(({ path, component: Component }) => (
        <Route
          exact
          path={path}
          component={props => <Component user={user} />}
          key={path}
        />
      ))}

      {user.role === '2' &&
        studentRoute.map(({ path, component: Component }) => (
          <Route
            exact
            path={path}
            component={props => <Component user={user} />}
            key={path}
          />
        ))}

      {user.role === '3' &&
        monitorRoute.map(({ path, component: Component }) => (
          <Route
            exact
            path={path}
            component={props => <Component user={user} />}
            key={path}
          />
        ))}

      {user.role === '4' &&
        preceptorRoutes.map(({ path, component: Component }) => (
          <Route exact path={path} component={Component} key={path} />
        ))}

      {user.role === '5' &&
        guardRoute.map(({ path, component: Component }) => (
          <Route exact path={path} component={Component} key={path} />
        ))}
    </>
  )
}
