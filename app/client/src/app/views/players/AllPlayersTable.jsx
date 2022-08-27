import React from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { styled } from '@mui/system'
import { SortableTable } from 'app/components'



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



const columns = [{
  id: 'first_name',
  numeric: false,
  disablePadding: true,
  label: 'First Name'
}, {
  id: 'last_name',
  numeric: false,
  disablePadding: true,
  label: 'Last Name'
}, {
  id: 'ph_number',
  numeric: false,
  disablePadding: true,
  label: 'Ph. Number'
}, {
  id: 'nickname',
  numeric: false,
  disablePadding: true,
  label: 'Nickname'
}, {
  id: 'email',
  numeric: false,
  disablePadding: true,
  label: 'Email'
}]



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



const AllPlayersTable = () => {

  const [players, setPlayers] = React.useState([])

  const getPlayers = () => {
    axios.get('http://localhost:3001/player')
    .then(res => {
      const myData = res.data
      console.log(myData)
      setPlayers(myData)
    })
    .catch(err => console.log(err))
  }


  React.useEffect(() => getPlayers(), [])

  return ( 
    <Container>
      <AddPlayer />
      <SortableTable columns={columns} rows={players} title='All Players'/>
    </Container>
  )

  /*return (
    <Container>
      <SimpleCard title="All Players">
        <Box width="100%" overflow="auto">
            <PlayerTable columns={columns} rows={players}/>
        </Box>
      </SimpleCard>
    </Container>
  )*/
}

export default AllPlayersTable