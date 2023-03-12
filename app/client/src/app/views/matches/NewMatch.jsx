import React from 'react'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  Box
} from '@mui/material'
import dayjs from 'dayjs'
import { SimpleCard } from 'app/components'
import { PlayerFormTable } from 'app/components'
import { DateTimeSelector } from 'app/components'
import DefaultContainer from 'app/components/DefaultContainer'
import matchPlayerColumns from './matchPlayerColumns'
import axios from '../../../axios'



const SelectField = (props) => {
  const { label, name, options } = props
  const [selection, setSelection] = React.useState('')
  const handleChange = (event) => setSelection(event.target.value)
  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        id={name}
        name={name}
        label={label}
        value={selection}
        onChange={handleChange}
      >
        {options.map((option) => <MenuItem value={`${option}`} key={option}>{option}</MenuItem> )}
      </Select>
    </Box>

  )
}



const NewMatch = () => {

  const [players, setPlayers] = React.useState([])
  const [matchDate, setMatchDate] = React.useState(dayjs(new Date()))
  const [venues, setVenues] = React.useState([])
  const [competitions, setCompetitions] = React.useState([])

  React.useEffect(() => axios.get('/enums/venues').then(res => setVenues(res.data)), [])

  React.useEffect(() => axios.get('/enums/competitions').then(res => setCompetitions(res.data)), [])

  // Load the user squad players
  React.useEffect(() => {
    axios.get('/squad/players').then(res => {
      const result = res.data.players.map((player) => {
        return {
          player_id: player.player_id,
          name: player.name
        }
      })
      setPlayers(result)
    })
  }, [])



  // Can access the players array directly as it will have been updated interacting with the form
  const submitHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    //console.log(event.target)

    const participatingPlayers = players.filter((player) => player.in_squad)
    
    for(const [key, value] of data) {
      console.log(key)
      console.log(value)
    }

    //console.log(players[0])
    //console.log(matchDate)
  }



  return (
    <DefaultContainer>
      <SimpleCard title='Add A New Match'>

        <form onSubmit={submitHandler}>
          <Button color="primary" variant="contained" type="submit">Submit</Button>
          <FormGroup row>
            <TextField sx={{ minWidth: 120 }} label='Opposition' name='opposition' variant="standard"></TextField>
            <SelectField label='Competition' name='competition' options={competitions}/>
            <SelectField label='Venue' name='venue' options={venues}/>
            <DateTimeSelector label='DateTime' startDate={matchDate} changeHandler={(d) => setMatchDate(d)} />
            <TextField type='number' label='Goals For' name='goals_for'></TextField>
            <TextField type='number' label='Goals Against' name='goals_against'></TextField>
          </FormGroup>
        </form>

        <PlayerFormTable players={players} columns={matchPlayerColumns}/>
      </SimpleCard>
    </DefaultContainer>
  )
}

/*
return (
  <DefaultContainer>
    <SimpleCard title='Add A New Match'>
      <form onSubmit={submitHandler}>
        <Button color="primary" variant="contained" type="submit">Submit</Button>

        <TextField fullWidth label='Opposition' name='opposition' variant="standard"></TextField>
        <SelectField label='Competition' name='competition' options={competitions}/>
        <SelectField label='Venue' name='venue' options={venues}/>
        <DateTimeSelector label='DateTime' startDate={matchDate} changeHandler={(d) => setMatchDate(d)} />

      </form>
      <PlayerFormTable players={players} columns={matchPlayerColumns}/>
    </SimpleCard>
  </DefaultContainer>
)
*/


export default NewMatch