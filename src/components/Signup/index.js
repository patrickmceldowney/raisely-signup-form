import React from 'react';
import './Signup.css';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import FormikField from '../FormikField';
import * as yup from 'yup';

/**
 * Create the promise for the custom yup validation
 */
yup.addMethod(yup.string, 'checkValidEmail', function (message) {
  return this
    .test({
      name: 'checkValidEmail',
      exclusive: true,
      message: message || 'That email has already been registered!', //expect an i18n message to be passed in
      test: async (value) => {
        try {
          const response = await fetch('https://api.raisely.com/v3/check-user', {
            method: 'POST',
            mode: ' no-cors',
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
          return (json.data.status === 'OK') ? true : false;
        } catch (error) {
          if (error) {
            console.log(error.message)
          }
        }
      }
    })
});
/**
 * Set up the schema for yup for validation, including a custom validation
 * method to call the Raisely API to check for a valid email.
 */

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const schema = yup.object().shape({
  firstName: yup.string()
    .min(2, 'Too short!')
    .required('Required!'),
  lastName: yup.string()
    .min(2, 'Too short!')
    .required('Required!'),
  email: yup.string()
    .email('That\'s not a valid email!')
    .required('Required!'),
  password: yup.string()
    .matches(lowercaseRegex, 'one lowercase required!')
    .matches(uppercaseRegex, 'one uppercase required!')
    .matches(numericRegex, 'one number required!')
    .min(8, 'Minimum 8 charcaters required!')
    .required('Required!'),
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


const checkUserUrl = 'https://api.raisely.com/v3/check-user'
const signupUrl = 'https://api.raisely.com/v3/signup'
const campaignUuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'

/**
 * Check user email availability
 */
async function checkUser (email) {
  let response = await fetch((checkUserUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'campaignUuid': campaignUuid,
      'data': {
        'email': email
      }
    })
  })

  let result = await response.json()
  let status = result.data.status;
  console.log(status)
  return status;
}

/**
 * Make an API call to the Raisely API to sign up a new user.
 */
async function signUpUser (values) {
  let signupResponse = await(fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'campaignUuid': campaignUuid,
      'data': {
        'firstName': values.firstName,
        'lastName': values.lastName,
        'email': values.email,
        'password': values.password,
        'confirmPassword': values.confirmPassword
      }
    })
  }))
  
  let signupResult = await signupResponse.json()
  return signupResult;
}

/**
 * Form component function
 */
function Signup() {
  return (
    <div className='Signup'>
      <h1>Signup Form</h1>
      <p>A signup form using the Raisely API</p>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values, {resetForm, setFieldValue}) => {
          checkUser(values.email).then(json => {
            if(json === 'EXISTS') {
              alert('That email already exists!')
              setFieldValue('email', '')
              setFieldValue('confirmPassword', '')
              values.email = '';
            } else if(json === 'OK') {
              signUpUser(values).then(res => {
                console.log(res.message)
                resetForm({})
                //window.location.pathname = '/welcome'
              })
              .catch((e) =>
                console.log(e)
              );
            }
          })
          .catch((e) => 
            console.log(e)
          );
        }}
      >
        {({ dirty, isValid, touched, errors, resetForm }) => (
          <Form>
            <FormikField name='firstName' label='First Name' error={!!errors.firstName && touched.firstName} required />
            <FormikField name='lastName' label='Last Name' error={!!errors.lastName && touched.lastName} required />
            <FormikField name='email' label='Email' error={!!errors.email && touched.email} required />
            <FormikField name='password' label='Password' type='password' error={!!errors.password && touched.password} required />
            <FormikField name='confirmPassword' label='Confirm' type='password' error={!!errors.confirmPassword && touched.confirmPassword} required />
            <Button
              type='submit'
              variant="contained"
              color="secondary"
              disabled={!dirty || !isValid}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;