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
  useLocation,
  useNavigate
} from 'react-router-dom';

import Navigation from '../navigationBar/navigation';


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

export default function ModifyProduct() {
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  let temp1 = useLocation();
  if (temp1.state && temp1.state.data) {
    console.log("data----->", temp1.state.data);
    if (data == null) {
      setData(temp1.state.data);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data2 = new FormData(event.currentTarget);
    axios.put("http://localhost:8080/api/products/" + data.id, {
      "name": data2.get('Name'),
      "category": data2.get('Category'),
      "price": data2.get('Price'),
      "description": data2.get('Product'),
      "manufacturer": data2.get('Manufacturer'),
      "availableItems": data2.get('Available'),
      "imageUrl": data2.get('Image')
    })
      .then((response) => {
        console.log("response----->", response)
        navigate('/products',{ state: { productModified:true }})

      }).catch(error => {
        console.log("error occured--->", error);
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
            Modify Product
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
                  defaultValue={data ? data.name : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="Category"
                  label="Category"
                  name="Category"
                  autoComplete="Category"
                  defaultValue={data ? data.category : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Manufacturer"
                  label="Manufacturer"
                  name="Manufacturer"
                  autoComplete="Manufacturer"
                  defaultValue={data ? data.manufacturer : ''}
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
                  defaultValue={data ? data.availableItems : ''}
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
                  defaultValue={data ? data.price : ''}
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
                  defaultValue={data ? data.imageUrl : ''}
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
                  defaultValue={data ? data.description : ''}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              MODIFY PRODUCT
            </Button>
            <Grid container justifyContent="flex-end">

            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>

  );
}