import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const SquadList = Loadable(lazy(() => import('./SquadList')))


const squadRoutes = [{
  path: '/squad',
  element: <SquadList />
}]

export default squadRoutes