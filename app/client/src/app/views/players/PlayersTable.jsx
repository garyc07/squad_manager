import * as React from 'react'
import { styled } from '@mui/system'
import {
  Button
} from '@mui/material'
import { BasicTable } from 'app/components'
import  PlayerFormModal from './PlayerFormModal'
import playerColumns from './playerColumns'

import axios from '../../../axios'

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
      margin: '16px',
  },
  '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: {
          marginBottom: '16px',
      },
  },
}))

// Add the actions column specific for this table
const columns = playerColumns.concat({  id: 'actions', label: 'Actions',types: ['edit', 'delete'] })


const PlayersTable = () => {
  const [players, setPlayers] = React.useState([])
  const [playerFormEl, setPlayerFormEl] = React.useState([])


  React.useEffect(() => {
    axios.get('/players').then(res => {
      setPlayers(res.data)
    })
  }, [])


  const submitFormHandler = (s) => {
    // post the new values to update the player
    // reload table 
    console.log('FORM VALUEs')
    console.log(s)

    axios.post('/players', s).then(res => {
      console.log(res)
      // Respond with the created/updated object and merge it to the players data for update
      // setPlayers([res.data, ...players])
      setPlayerFormEl([])
    })

  }

  const cancelFormHandler = () => setPlayerFormEl([])


  const openPlayerForm = (rowData) => {
    const values = rowData || {}
    const playerFormModal = (
      <PlayerFormModal values={values} cancelHandler={cancelFormHandler} submitHandler={submitFormHandler} key="playerForm"></PlayerFormModal>
    )
    setPlayerFormEl(playerFormEl.concat(playerFormModal))
  }


  const deleteActionHandler = (rowData) => {
    // Send a DELETE request and reload the table
    alert(rowData)
  }

  const editActionHandler = (rowData) => openPlayerForm(rowData)

  return (
    <Container>
      <div>
        <Button onClick={openPlayerForm}>Add New Player</Button>
      </div>
      <BasicTable columns={columns} rows={players} deleteHandler={deleteActionHandler} editHandler={editActionHandler}></BasicTable>
      {playerFormEl}
    </Container>
  )
}

export default PlayersTable