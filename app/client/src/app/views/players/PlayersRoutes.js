import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const PlayerTable = Loadable(lazy(() => import('./PlayerTable')))

const playersRoutes = [
    {
        path: '/players',
        element: <PlayerTable />,
        auth: authRoles.admin,
    },
]

export default playersRoutes
