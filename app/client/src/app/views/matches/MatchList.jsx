import React from 'react'
import { SortableTable } from 'app/components'
import DefaultContainer from 'app/components/DefaultContainer'
import matchColumns from './matchColumns'
import { prettyPrintDateTime } from '../../utils/dates'
import axios from '../../../axios'


const wld = (gf, ga) => {
  if(gf > ga) return 'W'
  if(gf < ga) return 'L'
  if(gf === ga) return 'D'
}


const MatchList = () => {

  const [matches, setMatches] = React.useState([])


  const formatMatchRows = (matches) => {
    return matches.map((match) => {
      match.date = prettyPrintDateTime(match.date_time)
      match.outcome = wld(match.goals_for, match.goals_against)

      return match
    })
  }

  React.useEffect(() => {
    axios.get('/matches').then(res => {
      console.log(res.data)
      setMatches(formatMatchRows(res.data))
    })
  }, [])

  return ( 
    <DefaultContainer>
      <SortableTable columns={matchColumns} rows={matches} rowidKey='id' title='Matches Played'/>
    </DefaultContainer>
  )

}

export default MatchList