import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, 
  Typography,
  Modal,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { newPlayer } from '../../utils/form-post'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export const AddPlayerModal = (props) => {

  //const router = useRouter();
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      nickname: '',
      //dob: new Date(),
      ph_number: '',
      email: ''
    },
    validationSchema: Yup.object({
      first_name: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      last_name: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      nickname: Yup
        .string()
        .max(255),
      dob: Yup
        .string()
        .max(255),
      ph_number: Yup
        .string()
        .max(20),
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
    }),
    onSubmit: async (data) => {
      const res = await newPlayer(data)
      console.log(res)
      props.handleClose.call()
    }
  });



  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box component="main" sx={style}>
          <Container maxWidth="sm">
            <Button startIcon={<ArrowBackIcon fontSize="small" />} onClick={props.handleClose}> Back </Button>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">Add New Player</Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.first_name && formik.errors.first_name)}
                fullWidth
                helperText={formik.touched.first_name && formik.errors.first_name}
                label="First Name"
                margin="normal"
                name="first_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.first_name}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.last_name && formik.errors.last_name)}
                fullWidth
                helperText={formik.touched.last_name && formik.errors.last_name}
                label="Last Name"
                margin="normal"
                name="last_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.last_name}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Nickname (optional)"
                margin="normal"
                name="nickname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nickname}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Phone Number (optional)"
                margin="normal"
                name="ph_number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.ph_number}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address (optional)"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Player
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </>
    </Modal>
  )
}