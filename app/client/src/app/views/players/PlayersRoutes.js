import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const PlayersList = Loadable(lazy(() => import('./PlayersList')))

const playersRoutes = [{
  path: '/players',
  element: <PlayersList />
}]

export default playersRoutes
