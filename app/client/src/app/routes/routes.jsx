import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import playersRoutes from 'app/views/players/PlayersRoutes'
import squadRoutes from 'app/views/squad/SquadRoutes'
import matchesRoutes from 'app/views/matches/MatchesRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...squadRoutes, ...matchesRoutes, ...playersRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="squad" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
