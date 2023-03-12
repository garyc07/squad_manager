import * as React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { SimpleSelect } from 'app/components'

import axios from '../../../axios'




const PlayerSquadDialog = (props) => {
  const {
    title,
    rowValues,
    cancelHandler,
    addToSquadHandler
  } = props


  // Getting/setting the available squad options for the select field
  const [squads, setSquads] = React.useState([])
  React.useEffect(() => {
    axios.get('/squad').then(res => setSquads(res.data))
  }, [])

  const [selectedSquadId, setSelectedSquadId] = React.useState('')

  const addButtonHandler = () => {
    // TODO, show some error is no selection is made (selectedSquadId = '')
    addToSquadHandler(selectedSquadId, rowValues)
  }

  const onSquadSelectHandler = (selectedValue) => setSelectedSquadId(selectedValue)


  return (
    <div>
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose Squad to Add Player Too
          </DialogContentText>

          <SimpleSelect label='Squads' options={squads} onSelect={onSquadSelectHandler}/>
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
            <Button onClick={addButtonHandler} color="primary"> Add </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default PlayerSquadDialog