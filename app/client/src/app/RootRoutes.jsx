import React from 'react'
import { Redirect } from 'react-router-dom'
import playersRoutes from './views/players/playersRoutes'
import squadRoutes from './views/squad/squadRoutes'
import matchesRoutes from './views/matches/matchesRoutes'
import trainingRoutes from './views/training/trainingRoutes'

const redirectRoute = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/squad" />,
  }
]

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
]

const routes = [
  ...squadRoutes,
  ...matchesRoutes,
  ...trainingRoutes,
  ...playersRoutes,
  ...redirectRoute,
  ...errorRoute
]

export default routes
