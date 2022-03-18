import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card } from '@mui/material';


export const SquadPlayerList = ({ players, ...rest }) => {
  const columns = [{ 
    field: 'fullName', 
    headerName: 'Name', 
    sortable: false, 
    width: 160, 
    valueGetter: (params) => `${params.row.first_name || ''} ${params.row.last_name || ''}`
  }, { 
    field: 'positions', 
    headerName: 'Positions', 
    sortable: false, 
    width: 100, 
    valueGetter: (params) => `${params.row.positions[0].acronym}`
  }, {
    field: 'apps',
    headerName: 'Apps',
    sortable: false,
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.num_games_played_in} (${params.row.match_stats.combined.num_games_on_as_sub})`
  },{
    field: 'totalMins',
    headerName: 'T Mins',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.total_mins_played}`
  }, {
    field: 'goalsScored',
    headerName: 'Goals',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.goals}`
  }, {
    field: 'assists',
    headerName: 'Assists',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.assists}`
  }, {
    field: 'mom',
    headerName: 'Mom',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.num_mom}`
  }, {
    field: 'cleanSheets',
    headerName: 'Cls',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.clean_sheets}`
  }, {
    field: 'averageRatingMatch',
    headerName: 'AV Rat',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.match_stats.combined.average_rating}`
  }, {
    field: 'sessionAttendanceCount',
    headerName: 'Sessions',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.training_stats.num_sessions_attended}`
  }, {
    field: 'sessionAttendancePercentage',
    headerName: 'Ses Att',
    width: 90,
    valueGetter: (params) => '80%'
  }, {
    field: 'averageRatingSessions',
    headerName: 'Ses AV Rat',
    type: 'number',
    width: 90,
    valueGetter: (params) => `${params.row.training_stats.average_rating}`
  }]


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rest.data.data}
              columns={columns}
              pageSize={30}
              rowsPerPageOptions={[30]}
              getRowId={(row) => row.player_id}
            />
          </div>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
