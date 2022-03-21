import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'
//import { navigations } from 'app/navigations'

const SquadList = Loadable(lazy(() => import('./SquadList')))

//console.log(navigations)

const squadsRoutes = [{
  path: '/squad/1',
  element: <SquadList />,
  auth: authRoles.admin
}, {
  path: '/squad/2',
  element: <SquadList />,
  auth: authRoles.admin
}]

export default squadsRoutes
