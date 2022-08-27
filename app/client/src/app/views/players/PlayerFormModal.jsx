import * as React from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import playerColumns from './playerColumns'


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
  const {
    formik,
    column
  } = props
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
    />
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

  const title = !!(values.id) ? 'Update Player Detail' : 'Add New Player'

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
    onSubmit: (values) => submitHandler(values)
  });



  return (
    <div>
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            {playerColumns.filter((column) => !column.hidden).map((column) => {
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