import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const PlayersTable = Loadable(lazy(() => import('./PlayersTable')))

const playersRoutes = [{
  path: '/players',
  element: <PlayersTable />,
  auth: authRoles.admin,
}]

export default playersRoutes
