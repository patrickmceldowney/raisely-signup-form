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

export default schema;