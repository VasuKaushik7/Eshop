import * as React from 'react';
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
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import Navigation from '../navigationBar/navigation';




const baseURL = "http://localhost:8080/api/auth/signin";


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
export let token = null;
export let isAnAdmin=false;
export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(baseURL, {
      "username":data.get('email'),
      "password":data.get('password'),
      })
      .then((response) => {
        console.log("response----->",response.data.token);
        token=response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        checkIfAdmin();
       console.log("isAdmin------->",isAnAdmin);
        // setTimeout(() => {
         
        // }, 5000); 
      }).catch(error => {
        console.log("error occured--->",error);
      });

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  async function checkIfAdmin(){
    await axios.post("http://localhost:8080/api/products/", {
      "name":"Reebok Shoe",
      "category":"Shoe",
      "price":"2000",
      "description":"This is a running shoe for every enthusiast goo quality.",
      "manufacturer":"Reebok",
      "availableItems":"20",
      "imageUrl":"https://assets.ajio.com/medias/sys_master/root/20230112/f3Yt/63bfe75eaeb269c651dab3db/-473Wx593H-469105071-black-MODEL.jpg"
      })
      .then( (response) => {
        console.log("response----->",response);
         deleteProduct(response)
        return true
      }).catch(error => {
        isAnAdmin=false
        navigate('/products', { state: { token:token, isAdmin:false }})
        console.log("error occured--->",error);
        return false
      });
  }
  async function deleteProduct(response){
    
   await axios.delete("http://localhost:8080/api/products/"+response.data).then((response) => {
    isAnAdmin=true;
   navigate('/products', { state: { token:token, isAdmin:true }})
  }).catch(error=>{})
  }

  return (
    <ThemeProvider theme={theme}>
    <Navigation/>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
