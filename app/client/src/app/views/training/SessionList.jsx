import React from 'react'
import { SortableTable } from 'app/components'
import DefaultContainer from 'app/components/DefaultContainer'
import sessionColumns from './sessionColumns'
import axios from '../../../axios'



const SessionList = () => {

  const [sessions, setSessions] = React.useState([])

  React.useEffect(() => {
    axios.get('/squad/players').then(res => {
      //setPlayers(res.data.players)
      //setSquadName(res.data.squad_name)
    })
  }, [])

  return ( 
    <DefaultContainer>
      <SortableTable columns={sessionColumns} rows={sessions} title='Training Sessions'/>
    </DefaultContainer>
  )

}

export default SessionList