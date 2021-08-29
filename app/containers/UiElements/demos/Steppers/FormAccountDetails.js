import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useDispatch } from "react-redux";
import { register } from '../../../../redux/actions/UserAction'

import { Button, InputAdornment, IconButton } from '@material-ui/core';
import * as yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({

  userName: yup.string().required('userName is required').max(20),
  password: yup.string().required("password is required").min(4, "Password must contain at least 4 characters"),
  confirmPassword: yup.string().required("Confirm your password").oneOf([yup.ref('password'), null], "Password not conform")

});




export const FormAccountDetails = ({ formData, setFormData, nextStep, prevStep}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

  const handleRegister = async (values) => {
    
    await dispatch(register(values)).then(result => {
     
      if (result===true) {
  
        history.push({
         // pathname: `/owner/home-owner`,
         pathname: `/App`,

        });

      } 
      else {
          setOpen(true);
          setMessage(result);
          setTypeMessage("error")
      }
  })
  
  
  }

  const [passwordsVisibility, setPasswordsVisibility] = useState({
    showPassword: false,
    showPasswordConfirm: false,
  });


  const handleClickShowPassword = (type) => {
    type === "new" && setPasswordsVisibility({ ...passwordsVisibility, showPassword: !passwordsVisibility.showPassword });
    type === "confirm" && setPasswordsVisibility({ ...passwordsVisibility, showPasswordConfirm: !passwordsVisibility.showPasswordConfirm });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <>
       <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    open={open}
                    autoHideDuration={2000} 
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity={typeMessage}>
                      {message}
                    </Alert>
        </Snackbar>

      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          handleRegister(values)
         
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Field
              name='userName'
              label='User name *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.userName && !!errors.userName}
              helperText={touched.userName && errors.userName}
            />

            <Field
             type={passwordsVisibility.showPassword ? 'text' : 'password'}
              name='password'
              label='Password *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("new")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {passwordsVisibility.showPassword ? <Visibility key="1" /> : <VisibilityOff key="1" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
              <Field
              type={passwordsVisibility.showPasswordConfirm ? 'text' : 'password'}
              name='confirmPassword'
              label='Confirm Password *'
              margin='normal' fullWidth variant="outlined"
              as={TextField}
              error={!!touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("confirm")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {passwordsVisibility.showPasswordConfirm ? <Visibility key="1" /> : <VisibilityOff key="1" />}
                  </IconButton>
                </InputAdornment>
                )
              }}
            />
           
           

           <div className={classes.textCenter}>
          <Button
            color='primary'
            variant='contained'
            className={classes.button}
            onClick={() => prevStep()}
          >
            Back
          </Button>

          <Button
           type='submit'
            color='secondary'
            variant='contained'
            className={classes.button}
           
          >
            Confirm & Save
          </Button>
          
        </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

FormAccountDetails.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
