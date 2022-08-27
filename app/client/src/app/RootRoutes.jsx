import React from 'react'
import { Redirect } from 'react-router-dom'
import playersRoutes from './views/players/PlayersRoutes'
import squadRoutes from './views/squad/SquadRoutes'
import matchesRoutes from './views/matches/MatchesRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...squadRoutes,
    ...matchesRoutes,
    ...playersRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
