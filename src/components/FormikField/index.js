import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Field } from 'formik';
import './FormikField.css';

const FormikField = ({ name, label, type='text', required=false, error=false }) => {
  return(
    <div className='FormikField'>
      <Field
        color='primary'
        required={required}
        name={name}
        autoComplete='off'
        label={label}
        as={TextField}
        type={type}
        helperText={<ErrorMessage name={name} />}
        error={error}
        fullWidth
      />
    </div>
  )
}

export default FormikField