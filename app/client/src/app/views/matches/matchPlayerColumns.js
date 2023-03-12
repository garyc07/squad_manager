const matchPlayerColumns = [{
  id: 'name',
  label: 'Name'
}, {
  id: 'in_squad',
  label: 'In Squad',
  type: 'checkbox',
  main: true
}, {
  id: 'started',
  label: 'Started',
  type: 'checkbox'
}, {
  id: 'on_as_sub',
  label: 'As Sub',
  type: 'checkbox'
}, {
  id: 'unused_sub',
  label: 'Unused Sub',
  type: 'checkbox'
}, {
  id: 'mins_played',
  label: 'Mins',
  type: 'textfield',
  numeric: true
}, {
  id: 'goals',
  label: 'Goals',
  type: 'textfield',
  numeric: true
}, {
  id: 'assists',
  label: 'Assists',
  type: 'textfield',
  numeric: true
}, {
  id: 'rating',
  label: 'Rating',
  type: 'textfield',
  numeric: true
}]

export default matchPlayerColumns