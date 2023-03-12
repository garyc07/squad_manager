import React from 'react'
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    TableSortLabel,
    Box,
    IconButton,
    Icon
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { SimpleCard } from 'app/components'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}



function SortableTableHead(props) {
  const { order, orderBy, onRequestSort, columns } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        {columns.filter((column) => !column.hidden).map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}


const SortableTable = (props) => {
  const {
    columns,
    rows,
    rowidKey,
    title,
    addHandler,
    deleteHandler,
    editHandler
  } = props

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }


  return (
    <SimpleCard title={title}>
      <Box width="100%" overflow="auto">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <SortableTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={columns}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))
                .map((row) => {
                  const rowIdentifier = row[rowidKey]
                  return (
                    <TableRow hover tabIndex={-1} key={rowIdentifier}>
                      {columns.filter((column) => !column.hidden).map((column) => {
                        if(column.id === 'actions'){
                          return (                      
                          <TableCell key={`${column.id}_${rowIdentifier}`}>
                            {column.types.map((t) => {
                              switch(t){
                                case 'delete':
                                  return (<IconButton key={`delete_${rowIdentifier}`} onClick={() => deleteHandler(row)}><Icon color="error">close</Icon></IconButton>)
                                case 'edit':
                                  return (<IconButton key={`edit_${rowIdentifier}`} onClick={() => editHandler(row)}><Icon color="edit">edit</Icon></IconButton>)
                                case 'add':
                                  return (<IconButton key={`add_${rowIdentifier}`} onClick={() => addHandler(row)}><Icon color="edit">add</Icon></IconButton>)
                                default:
                                  return null
                              }
                            })}
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell key={`${column.id}_${rowIdentifier}`}>{row[column.id]}</TableCell>
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

export default SortableTable