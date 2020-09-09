import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Signup.css';
import { Formik } from 'formik'
import * as yup from 'yup';


/**
 * Create the promise for the custom yup validation
 */
yup.addMethod(yup.string, 'checkValidEmail', function (message) {
  return this
    .test({
      name: 'checkValidEmail',
      exclusive: true,
      message: message || 'Must be a valid email', //expect an i18n message to be passed in
      test: async function (value) {
        const response = await fetch('https://api.raisely.com/v3/check-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'campaignUuid': '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
            'data': {
              'email': value,
            }
          })
        });
        const json = await response.json();
        console.log(json.data.status);
        return (json.data.status === 'OK') ? true : false;
      }
    })
})
/**
 * Set up the schema for yup for validation, including a custom validation
 * method to call the Raisely API to check for a valid email.
 */
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
    .required('Email is required')
    .checkValidEmail('Must be a valid email address'),
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

/**
 * Set the initial values of the form
 */
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

/**
 * Make an API call to the Raisely API to sign up a new user.
 * Email validation has already taken place.
 */
async function signUpUser (values) {
  let response = await fetch('https://api.raisely.com/v3/check-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'campaignUuid': '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
      'data': {
        'firstName': values.firstName,
        'lastName': values.lastName,
        'email': values.email,
        'password': values.password
      }
    })
  });

  let json = await response.json();
  return json;
}


/**
 * Form component function
 */
function Signup() {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        signUpUser(values)
          .then(function(json) {
            console.log(json);
            if(json.data.status === 'OK') {
              window.location.pathname = '/welcome'
            }
          })
          .catch(function(error) {
            console.log('Request failed: ', error)
          })
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
        isSubmitting
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
                placeholder='confirm'
                value={values.confirmPassword}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;