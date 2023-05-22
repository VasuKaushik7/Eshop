// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Navigation from '../navigationBar/navigation';
import { fabClasses } from '@mui/material';


const baseURL = "http://localhost:8080/api/auth/signup";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        UpGrad
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [success, setSuccess] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("error occured");
  const [open, setOpen] = useState(true);
  const [passwordError,setPasswordError]=useState(false);
  const [failure,setFaliure]=useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: '',
    contact: ''
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    cpassword: false,
    contact: false
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const updatedErrors = {};

    // Check for empty fields
    Object.entries(inputValues).forEach(([key, value]) => {
      if (value.trim() === '') {
        formIsValid = false;
        updatedErrors[key] = true;
      }
    });

    if (!formIsValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...updatedErrors,
      }));
    }
    else if(inputValues.password!=inputValues.cpassword){
      setPasswordError(true);
    }
    else {
      const data = new FormData(event.currentTarget);
      axios.post(baseURL, {
        "email": data.get('email'),
        "password": data.get('password'),
        "firstName": data.get('firstName'),
        "lastName": data.get('lastName'),
        "contactNumber": data.get('contact')
      })
        .then((response) => {
          console.log("response----->", response)
          setInputValues({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            cpassword: '',
            contact: ''
          })
          setSuccess(true)
          setTimeout(() => {
            setOpen(false);
          }, 5000);
        }).catch(error => {
          console.log("error occured--->", error);
          setErrorMessage(error.response.data.message);
          setFaliure(true);
          setTimeout(() => {
            setOpen(false);
            setFaliure(false);
            setOpen(true);
          }, 5000);
        });
      // if()
      // console.log({
      //   email: data.get('email'),
      //   password: data.get('password'),
      // });
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  return (

    <ThemeProvider theme={theme}>
      <Navigation />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={inputValues.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  helperText={errors.firstName ? 'Field cannot be empty' : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={inputValues.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  helperText={errors.lastName ? 'Field cannot be empty' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={inputValues.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  helperText={errors.email ? 'Field cannot be empty' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={inputValues.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  helperText={errors.password ? 'Field cannot be empty' : passwordError?'Passwords donot match':''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="cpassword"
                  id="cpassword"
                  autoComplete="new-cpassword"
                  value={inputValues.cpassword}
                  onChange={handleInputChange}
                  error={errors.cpassword}
                  helperText={errors.cpassword ? 'Field cannot be empty' : passwordError?'Passwords donot match':''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact Number"
                  name="contact"
                  autoComplete="contact"
                  value={inputValues.contact}
                  onChange={handleInputChange}
                  error={errors.contact}
                  helperText={errors.contact ? 'Field cannot be empty' : ''}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        {success && <Snackbar open={open} autoHideDuration={6000} >
          <Alert severity="success" sx={{ width: '100%' }}>
            User registered successfully!
          </Alert>
        </Snackbar>}
        
        {failure && <Snackbar open={open} autoHideDuration={6000} >
          <Alert severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>}
      </Container>
    </ThemeProvider>

  );
}