import * as React from 'react'
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box
} from '@mui/material'


const SimpleSelect = (props) => {
  const {
    label,
    options,
    onSelect,
  } = props

  const [selection, setSelection] = React.useState('')

  // Sets the current value of the select + passes the selected value back to the parent via the onSelect prop function
  const handleChange = (event) => {
    setSelection(event.target.value)
    onSelect(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="simple-select"
          value={selection}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => {
            return (
              <MenuItem value={`${option.id}`} key={option.name}>{option.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SimpleSelect