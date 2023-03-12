export const navigations = [{
  name: 'Squad',
  path: '/squad',
  icon: 'people'
}, {
  name: 'Matches',
  icon: 'security',
  children: [{
    name: 'Played',
    path: '/matches/played'
  }, {
    name: 'New Match',
    path: '/matches/new'
  }, {
    name: 'Stats',
    path: '/matches/stats'
  }]
}, {
  name: 'Training',
  icon: 'security',
  children: [{
    name: 'Sessions',
    path: '/training/sessions'
  }, {
    name: 'New Session',
    path: '/training/session/new'
  }]
}, {
  name: 'Club Players',
  path: '/players',
  icon: 'people'
}]
