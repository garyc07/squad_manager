import React from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TextField,
    Button,
    IconButton,
    Icon,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

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


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}))


const AddPlayer = () => {
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
      setOpen(false)
  }

  return (
    <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
            Add Player
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    </div>
)
}


const Deactivate = () => {
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
      setOpen(false)
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Icon color="error">close</Icon>
      </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means
              sending anonymous location data to Google, even when no
              apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
              Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}



const Tbody = () => {

  const [data, setData] = React.useState([])

  const getData = () => {
    axios.get('http://localhost:3001/player')
    .then(res => {
      const myData = res.data
      setData(myData)
    })
    .catch(err => console.log(err))
  }


  React.useEffect(() => getData(), [])

  return (
    <TableBody>
      {data.map((player) => (
        <TableRow key={player.id}>
          <TableCell align="left">
            {player.first_name}
          </TableCell>
          <TableCell align="left">
            {player.last_name}
          </TableCell>
          <TableCell>{player.nickname}</TableCell>
          <TableCell>{player.email}</TableCell>
          <TableCell>{player.ph_number}</TableCell>
          <TableCell>
            <Deactivate />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )

}

const PlayerTable = () => {
    return (
      <Container>
        <AddPlayer />
        <SimpleCard title="All Players">
          <Box width="100%" overflow="auto">
              <StyledTable>
                  <TableHead>
                      <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Company</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Action</TableCell>
                      </TableRow>
                  </TableHead>
                  <Tbody />
              </StyledTable>
          </Box>
        </SimpleCard>
      </Container>
    )
}

export default PlayerTable
