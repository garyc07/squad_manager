import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Checkbox
} from '@mui/material'




const TableHeader = (props) => {
  const { columns } = props 
  return (
    <TableHead>
      <TableRow key='header'>
      {columns.map((column) => (
        <TableCell 
          key={column.id}
          align={column.numeric ? 'center' : 'left'}
          padding={column.disablePadding ? 'none' : 'normal'}
        >
          {column.label}
        </TableCell>
      ))}
      </TableRow>
    </TableHead>
  )
}



const PlayerTableRow = (props) => {
  const { columns, player, onChangeHandler } = props
  return (
    <TableRow>
      {columns.map((column) => {

        if(column.main){
          player[column.id] = false
        }

        if(column.type === 'checkbox'){
          return (
            <TableCell key={`${column.id}_${player.player_id}`}>
              <Checkbox name={column.id} onChange={(e) => onChangeHandler(e.target, player)}></Checkbox>
            </TableCell>
          )
        }

        if(column.type === 'textfield'){
          return (
            <TableCell key={`${column.id}_${player.player_id}`}>
              <TextField name={column.id} type='number' onChange={(e) => onChangeHandler(e.target, player)}></TextField>
            </TableCell>
          )
        }

        return (
          <TableCell key={`${column.id}_${player.player_id}`}>{player[column.id]}</TableCell>
        )

      })}

    </TableRow>
  )
}


// Update the players state object that is passed directly here
// No UI state should need to be updated, the players object can be accessed in the parent submit handler to send the configured data
const formChangeHandler = (target, player) => {
  const { type, name, checked, value } = target

  if(type === 'checkbox'){
    player[name] = checked
  }

  if(type === 'number' || type === 'text'){
    player[name] = value
  }

}


const PlayerFormTable = (props) => {
  const { columns, players } = props
  return (
    <TableContainer>
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {players.map((player) => (
            <PlayerTableRow key={player.player_id} columns={columns} player={player} onChangeHandler={formChangeHandler} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlayerFormTable