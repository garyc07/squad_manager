export const navigations = [
    {
      name: 'Squad',
      path: '/squad',
      icon: 'people',
    },
    {
      name: 'Matches',
      icon: 'security',
      children: [{
          name: 'Played',
          path: '/matches/played'
        }, {
          name: 'Stats',
          path: '/matches/stats'
        }, {
          name: 'New Match',
          path: '/matches/new'
        }
      ]
    },
    {
        name: 'Club Players',
        path: '/players',
        icon: 'people',
    },
    {
        label: 'PAGES',
        type: 'label',
    },
    {
        name: 'Session/Auth',
        icon: 'security',
        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
            },
        ],
    }
]
