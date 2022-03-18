import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';


export const AllPlayerList = ({ players, ...rest }) => {
  const columns = [
    { 
      field: 'fullName', 
      headerName: 'Name', 
      sortable: false, 
      width: 160, 
      valueGetter: (params) => `${params.row.first_name || ''} ${params.row.last_name || ''}`
    },
    { field: 'ph_number', headerName: 'Phone No.', sortable: false, width: 100 },
    { field: 'email', headerName: 'Email', sortable: false, width: 100 },
    { field: 'active', headerName: 'Active', width: 100 }
  ]
  


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <div style={{ height: 1200, width: '100%' }}>
            <DataGrid
              rows={rest.data.data}
              columns={columns}
              pageSize={25}
              rowsPerPageOptions={[25]}
              checkboxSelection
            />
          </div>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
