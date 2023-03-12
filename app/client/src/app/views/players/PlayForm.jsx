import * as React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'


const withFormik = Formik({
  mapPropsToValues: () => ({ color: '' }),
  validationSchema: yup.object().shape({
    color: yup.string().required('Color is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm', // helps with React DevTools
})

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: 'block' }}>
        Color
      </label>
      <select
        name="color"
        value={values.color}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: 'block' }}
      >
        <option value="" label="Select a color" />
        <option value="red" label="red" />
        <option value="blue" label="blue" />
        <option value="green" label="green" />
      </select>
      {errors.color &&
        touched.color &&
        <div className="input-feedback">
          {errors.color}
        </div>}

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )
}

const PlayForm = withFormik(MyForm)

export default PlayForm