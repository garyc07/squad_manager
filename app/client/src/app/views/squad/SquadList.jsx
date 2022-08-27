import React from 'react'
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
  id: 'name',
  numeric: false,
  disablePadding: true,
  label: 'Name'
}, {
  id: 'ph_number',
  numeric: false,
  disablePadding: true,
  label: 'Ph. Number'
}, {
  id: 'email',
  numeric: false,
  disablePadding: true,
  label: 'Email'
}]


const SquadList = () => {

  const [players, setPlayers] = React.useState([])

  React.useEffect(() => {
    axios.get('/players').then(res => {
      setPlayers(res.data)
    })
  }, [])

  return ( 
    <Container>
      <SortableTable columns={columns} rows={players} title='SQUAD X'/>
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

export default SquadList