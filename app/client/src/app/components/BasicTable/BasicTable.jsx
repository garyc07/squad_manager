import * as React from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Box,
  IconButton,
  Icon,
  TableRow
} from '@mui/material'
import { SimpleCard } from 'app/components'


const BasicTable = (props) => {

  const {
    columns,
    rows,
    title,
    deleteHandler,
    editHandler
  } = props

  return (
    <SimpleCard title={title}>
      <Box width="100%" overflow="auto">
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <TableHead>
              <TableRow>
                {columns.filter((column) => !column.hidden).map((column) => {
                  return (
                    <TableCell key={column.id} align='right'>{column.label}</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return(
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {columns.filter((column) => !column.hidden).map((column) => {
                      if(column.id === 'actions'){
                        return (                      
                        <TableCell key={`${column.id}_${row.id}`}>
                          {column.types.map((t) => {
                            switch(t){
                              case 'delete':
                                return (<IconButton key={`delete_${row.id}`} onClick={() => deleteHandler(row)}><Icon color="error">close</Icon></IconButton>)
                              case 'edit':
                                return (<IconButton key={`edit_${row.id}`} onClick={() => editHandler(row)}><Icon color="edit">edit</Icon></IconButton>)
                              default:
                                return null
                            }
                          })}
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell align='right' key={`${column.id}_${row.id}`}>{row[column.id]}</TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </SimpleCard>
  )
}

export default BasicTable
