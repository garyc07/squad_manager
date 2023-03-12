import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const SessionList = Loadable(lazy(() => import('./SessionList')))


const trainingRoutes = [{
  path: '/training/sessions',
  element: <SessionList />
}, {
  path: '/training/session/new',
  element: <SessionList />
}]

export default trainingRoutes
