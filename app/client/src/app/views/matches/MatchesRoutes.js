import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const MatchesTable = Loadable(lazy(() => import('./MatchesTable')))
const TestForm = Loadable(lazy(() => import('./TestForm')))


const matchesRoutes = [{
  path: '/matches/played',
  element: <MatchesTable />,
  auth: authRoles.admin
}, {
  path: '/matches/stats',
  element: <TestForm />,
  auth: authRoles.admin
}]

export default matchesRoutes
