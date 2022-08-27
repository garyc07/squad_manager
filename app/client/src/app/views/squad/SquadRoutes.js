import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const SquadList = Loadable(lazy(() => import('./SquadList')))


const squadRoutes = [{
  path: '/squad',
  element: <SquadList />,
  auth: authRoles.admin
}]

export default squadRoutes