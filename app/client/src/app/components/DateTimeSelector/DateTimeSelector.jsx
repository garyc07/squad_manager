import React from 'react'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'


const DateTimeSelector = (props) => {

  const { startDate, changeHandler, label, name = 'date' } = props
  //const [selectedDate, setSelectedDate] = React.useState(dayjs(startDate))


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        name={name}
        value={startDate}
        onChange={changeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}


export default DateTimeSelector