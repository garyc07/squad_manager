import React from 'react'
import { SortableTable } from 'app/components'
import DefaultContainer from 'app/components/DefaultContainer'
import squadColumns from './squadColumns'
import axios from '../../../axios'



/* const columns = [{
  id: 'name',
  numeric: false,
  disablePadding: true,
  label: 'Name'
}, {
  id: 'ph_number',
  numeric: false,
  disablePadding: true,
  label: 'Ph. Number'
}, {
  id: 'email',
  numeric: false,
  disablePadding: true,
  label: 'Email'
}] */


const SquadList = () => {

  const [players, setPlayers] = React.useState([])
  const [squadName, setSquadName] = React.useState('')

  React.useEffect(() => {
    axios.get('/squad/players').then(res => {
      setPlayers(res.data.players)
      setSquadName(res.data.squad_name)
    })
  }, [])

  return ( 
    <DefaultContainer>
      <SortableTable columns={squadColumns} rows={players} rowidKey='player_id' title={squadName}/>
    </DefaultContainer>
  )

}

export default SquadList