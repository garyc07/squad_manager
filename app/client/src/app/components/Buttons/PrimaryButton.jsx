import { Button } from '@mui/material'

const PrimaryButton = (props) => {
  const { onClick, text } = props
  return (
    <Button variant="contained" color="primary" onClick={onClick}>{text}</Button>
  )
}

export default PrimaryButton