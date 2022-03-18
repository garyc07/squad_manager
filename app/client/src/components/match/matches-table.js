import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



const headCells = [{
  id: 'opposition',
  label: 'Opposition'
}, {
  id: 'homeAway',
  label: 'Home/Away'
}, {
  id: 'scoreline',
  label: 'Scoreline'
}, {
  id: 'competition',
  label: 'Competition'
}, {
  id: 'dateTime',
  label: 'Date'
}]


function TableHeadCells(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => {
          <TableCell>{headCell.label}</TableCell>
        })}
      </TableRow>
    </TableHead>
  )
}



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.opposition}
        </TableCell>
        <TableCell align="right">{(row.at_home) ? 'Home' : 'Away'}</TableCell>
        <TableCell align="right">{(row.at_home) ? `${row.goals_for} : ${row.goals_against}` : `${row.goals_against} : ${row.goals_for}`}</TableCell>
        <TableCell align="right">{row.Competition.name}</TableCell>
        <TableCell align="right">{row.date_time}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Players
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Mins Played</TableCell>
                    <TableCell align="right">Gls</TableCell>
                    <TableCell align="right">Ass</TableCell>
                    <TableCell align="right">Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell component="th" scope="row">
                        {`${player.first_name || ''} ${player.last_name || ''}`}
                      </TableCell>
                      <TableCell>{player.PlayerMatch.mins_played}</TableCell>
                      <TableCell align="right">{player.PlayerMatch.goals_scored}</TableCell>
                      <TableCell align="right">{player.PlayerMatch.assists}</TableCell>
                      <TableCell align="right">{player.PlayerMatch.manager_player_rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export const MatchListTable = ({matches, ...rest}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Opposition</TableCell>
            <TableCell align="right">Home/Away</TableCell>
            <TableCell align="right">Scoreline</TableCell>
            <TableCell align="right">Competition</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match) => (
            <Row key={match.id} row={match} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}