import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import LoaderButton from './LoaderButton';
import './Signup.css';
import { Formik } from 'formik'
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string()
    .min(2, 'First name must have at least 2 characters')
    .max(100, 'First name can be no longer than 100 characters')
    .required('First name is required'),
  lastName: yup.string()
    .min(2, 'Last name must have at least 2 characters')
    .max(100, 'Last name can be no longer than 100 characters')
    .required('Last name is required'),
  email: yup.string()
    .email('Must be a valid email address')
    .max(100, 'Email must be less than a 100 characters')
    .required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be at least 8 characters')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    })
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};
function Signup() {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className='Signup'>
          <Form.Row>
            <Form.Group as={Col} controlId='firstName'>
              <Form.Control 
                type='text'
                name='firstName'
                placeholder='First name'
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='lastName' >
              <Form.Control 
                type='text'
                name='lastName'
                placeholder='Last name'
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Control 
                autoFocus
                type='email'
                placeholder='email address'
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='password'>
              <Form.Control
                type='password'
                placeholder='password'
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='confirmPassword'>
              <Form.Control
                type='password'
                onChange={handleChange}
                placeholder='confirm password'
                value={values.confirmPassword}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <LoaderButton
            block
            type='submit'
            bsSize='large'
          >
            Submit
          </LoaderButton>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;