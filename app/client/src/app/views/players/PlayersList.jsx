import * as React from 'react'
import { SortableTable, PrimaryButton } from 'app/components'
import DefaultContainer from 'app/components/DefaultContainer'
import  PlayerFormModal from './PlayerFormModal'
import  PlayerSquadDialog from './PlayerSquadDialog'
import playerColumns from './playerColumns'
import axios from '../../../axios'


// Merge the actions columns specific for this table
const columns = playerColumns.concat({  id: 'actions', label: 'Actions', types: ['add', 'edit', 'delete'] })



const PlayersList = () => {
  
  const [players, setPlayers] = React.useState([])
  const [playerFormEl, setPlayerFormEl] = React.useState([])
  const [playerSquadDialogEl, setPlayerSquadDialogEl] = React.useState([])


  const formatPlayerRows = (players) => {
    return players.map((player) => {
      // format squads string
      player.squads = '(..)'
      if(player.Squads && player.Squads.length){
        const squadNames = player.Squads.map((squad) => squad.name)
        player.squads = `( ${squadNames.join(',')} )`
      }

      return player
    })
  }


  const sendPlayerData = (playerData, method) => {
    axios[method]('/players', playerData).then(res => {
      // Merge response into current players state object and clear the form
      setPlayers([res.data, ...players])
      setPlayerFormEl([])
    })
  }

  // Load the intitial table data
  React.useEffect(() => {
    axios.get('/players').then(res => {
      setPlayers(formatPlayerRows(res.data))
    })
  }, [])


  ////////// ADD or EDIT Player Form ///////////////
  const submitFormHandler = (formData, isEditForm) => {
    console.log(formData)
    if(!isEditForm){
      delete formData.id
      return sendPlayerData(formData, 'post')
    }

    sendPlayerData(formData, 'patch')
  }

  const cancelFormHandler = () => setPlayerFormEl([])


  const openPlayerForm = (rowData) => {
    const values = rowData || {}
    const playerFormModal = (
      <PlayerFormModal values={values} cancelHandler={cancelFormHandler} submitHandler={submitFormHandler} key="playerForm"></PlayerFormModal>
    )

    setPlayerFormEl(playerFormEl.concat(playerFormModal))
  }

  ////////// /////////// ////////////// /////////



  //////////////// Player Squad Dialog ///////////////////////////
  const cancelSquadDialogHandler = () => setPlayerSquadDialogEl([])
  const addPlayerToSquadHandler = (selectedValue, rowValues) => {
    const params = { player_id: rowValues.id, squad_id: selectedValue }
    axios.post('/squad/player', params).then((res) => {
      // TODO, need a way to reload the table row with the updated value
      console.log(res.data)
      setPlayerSquadDialogEl([])
    }).catch((err) => {
      // TODO, Handle this and all other ajax request potential failures
      console.log(err)
    })
  }
  const openPlayerSquadDialog = (rowData) => {
    const rowValues = rowData || {}
    const playerSquadDialog = (
      <PlayerSquadDialog 
        rowValues={rowValues} 
        cancelHandler={cancelSquadDialogHandler} 
        addToSquadHandler={addPlayerToSquadHandler}
      />
    )
    setPlayerSquadDialogEl(playerSquadDialogEl.concat(playerSquadDialog))
  }
  //////////////////// /////////////// //////////////////////////




  /////////////// Action Button Handlers /////////////////
  const deleteActionHandler = (rowData) => {
    // Send a DELETE request and reload the table
    alert(rowData)
  }

  const editActionHandler = (rowData) => openPlayerForm(rowData)
  const addPlayerActionHandler = (rowData) => openPlayerSquadDialog(rowData)

  ////////////// ////////////// //////////////// //////////////


  return (
    <DefaultContainer>
      <div>
        <PrimaryButton onClick={openPlayerForm} text='Add New Player' />
      </div>
      <SortableTable 
        columns={columns} 
        rows={players}
        rowidKey='id'
        addHandler={addPlayerActionHandler}
        editHandler={editActionHandler}
        deleteHandler={deleteActionHandler}
      />
      {playerFormEl}
      {playerSquadDialogEl}
    </DefaultContainer>
  )
}

export default PlayersList