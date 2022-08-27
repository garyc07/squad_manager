import * as React from 'react'
import { styled } from '@mui/system'
import { BasicTable } from 'app/components'

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
  id: 'opposition',
  label: 'Opposition'
}, {
  id: 'date',
  label: 'Date'
}, {
  id: 'location',
  label: 'Location'
}, {
  id: 'competition',
  label: 'Competition'
}, {
  id: 'scoreline',
  label: 'Scoreline'
}]

const MatchesTable = () => {
  const [matches, setMatches] = React.useState([])
  React.useEffect(() => {
    axios.get('/matches/played').then(res => {
      setMatches(res.data)
    })
  }, [])

  return (
    <Container>
      <BasicTable columns={columns} rows={matches}></BasicTable>
    </Container>
  )
}

export default MatchesTable
