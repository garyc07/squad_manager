import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const MatchList = Loadable(lazy(() => import('./MatchList')))
const NewMatch = Loadable(lazy(() => import('./NewMatch')))

const matchesRoutes = [{
  path: '/matches/played',
  element: <MatchList />
}, {
  path: '/matches/new',
  element: <NewMatch />
}]

export default matchesRoutes
