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
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {categoriesGlobal} from '../products/products'
import Navigation from '../navigationBar/navigation';
import CreatableSelect from 'react-select/creatable';
import { token } from '../login/login'

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

export default function AddProduct() {
  const navigate = useNavigate();
  const [ category,setCategory]= React.useState(null);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  const handleChange = (newValue) => {
    console.log(newValue);
    setCategory(newValue.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    axios.post("http://localhost:8080/api/products/", {
      
        "name":data.get('Name'),
        "category":category,
        "price":data.get('Price'),
        "description":data.get('Product'),
        "manufacturer":data.get('Manufacturer'),
        "availableItems":data.get('Available'),
        "imageUrl":data.get('Image')
      })
      .then((response) => {
        console.log("response----->",response);
        navigate('/products',{ state: { productAdded:true }})
        // navigate('/productDescription', { state: { data:data }})
        // token=response.data.token;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //   checkIfAdmin();
      //  console.log("isAdmin------->",isAnAdmin);
        // setTimeout(() => {
         
        // }, 5000); 
      }).catch(error => {
        console.log("error occured--->",error);
      });
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar> */}
          <Typography component="h1" variant="h5">
          Add Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="Name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
              <CreatableSelect isClearable  onChange={handleChange} options={categoriesGlobal} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Manufacturer"
                  label="Manufacturer"
                  name="Manufacturer"
                  autoComplete="Manufacturer"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Available"
                  label="Available Items"
                  type="Available"
                  id="Available"
                  autoComplete="Available"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Price"
                  label="Price"
                  type="Price"
                  id="Price"
                  autoComplete="Price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Image"
                  label="Image URL"
                  name="Image"
                  autoComplete="Image"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Product"
                  label="Product Description"
                  name="Product"
                  autoComplete="Product"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             SAVE PRODUCT
            </Button>
            <Grid container justifyContent="flex-end">
              
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
   
  );
}