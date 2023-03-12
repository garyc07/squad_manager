import * as React from 'react'
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import playerColumns from './playerColumns'
import axios from '../../../axios'


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})


const FormField = (props) => {
  const { formik, column } = props
  return (
    <TextField
      fullWidth
      id={column.id}
      name={column.id}
      label={column.label}
      value={formik.values[column.id]}
      onChange={formik.handleChange}
      error={formik.touched[column.id] && Boolean(formik.errors[column.id])}
      helperText={formik.touched[column.id] && formik.errors[column.id]}
      variant="standard"
    />
  )
}


const SelectFormField = (props) => {
  const { formik, column, options } = props
  return (
    <div>
      <InputLabel>{column.label}</InputLabel>
      <Select
        fullWidth
        id={column.id}
        name={column.id}
        label={column.label}
        value={formik.values[column.id]}
        onChange={formik.handleChange}
      >
        {options.map((option) => <MenuItem value={`${option}`} key={option}>{option}</MenuItem> )}
      </Select>
    </div>

  )
}



const FormButtonGroup = (props) => {
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={props.cancelHandler}>Cancel</Button>
      <Button color="primary" variant="contained" type="submit">Submit</Button>
    </div>
  )
}


const PlayerFormModal = (props) => {
  const {
    values,
    cancelHandler,
    submitHandler
  } = props

  const [positions, setPositions] = React.useState([])
  React.useEffect(() => {
    axios.get('/enums/positions').then(res => setPositions(res.data))
  }, [])


  const isEditForm = !!(values.id)
  const title = isEditForm ? 'Update Player Detail' : 'Add New Player'


  const initialValues = (() => {
    const vals = {}
    playerColumns.forEach((column) => {
      vals[column.id] = values[column.id] || ''
    })
    return vals
  })()


  const formik = useFormik({
    initialValues: initialValues,
    //validationSchema: validationSchema,
    onSubmit: (values) => submitHandler(values, isEditForm)
  })



  return (
    <div>
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            {playerColumns.filter((column) => !column.hidden).filter((column) => !column.form_hidden).map((column) => {
              if(column.type === 'select'){
                const selectOpts = (column.id === 'position') ? positions : []
                return (
                  <SelectFormField formik={formik} column={column} key={column.id} options={selectOpts}/>
                )
              }
              return (
                <FormField formik={formik} column={column} key={column.id}/>
              )
            })}
            <FormButtonGroup cancelHandler={cancelHandler}/>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default PlayerFormModal