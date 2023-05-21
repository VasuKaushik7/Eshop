import React, { useState ,useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Navigation from "../navigationBar/navigation"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import './createOrder.css'
import axios from 'axios';
import { token } from '../login/login'

const steps = [
  'Items',
  'Select Address',
  'Confirm Order',
];


export default function CreateOrder() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const location = useLocation();
  const item = location.state;
  const [selectedOption, setSelectedOption] = useState('');
  const [address, setAddress] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // API call function
    const fetchData = async () => {
      axios.get('http://localhost:8080/api/addresses')
        .then(response => {
          // Handle the response
          console.log(response.data);
          const newArray1 = [...address, ...response.data];
          setAddress(newArray1);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    };

    // Call the API function
    fetchData();
  }, []);

  console.log("address-------_>", address)
  const handleChange = (selection) => {
    console.log("clicked----->", selection.name);
    setSelectedAddress(selection);
    setSelectedOption(selection.name);

  };
  const handleNext = () => {
    let temp = stepNumber + 1;
    if (temp > 2) {
      navigate('/products', { state: { order: true } })
    }
    else {
      setStepNumber(temp);
    }
  }
  const handlePrev = () => {
    let temp = stepNumber - 1;
    setStepNumber(temp);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event------>", event);
    const data = new FormData(event.currentTarget);
    console.log("data--------->", data.get('name'));
    let temp = {
      name: data.get('name'),
      contactNumber: data.get('contact'),
      street: data.get('street'),
      city: data.get('city'),
      state: data.get('state'),
      landmark: data.get('landmark'),
      zipCode: data.get('zipCode')
    }
    console.log("temp-------->", temp);
    const newArray = [...address, temp];
    setAddress(newArray);


  };
  console.log("item-------->", item);
  return (
    <>
      <div className="app">
        <div className="content">
          <Navigation loggedIn={true} /><Box sx={{ width: '100%' }}>
            <br />
            <br />
            <br />
            <br />
            <Stepper activeStep={stepNumber} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {stepNumber == 0 && <Grid container spacing={2}>
              <Grid xs={4}>
                <img
                  src={item.imageUrl} />
              </Grid>
              <Grid xs={8}>
                <div className="description">
                  <span className="productName">
                    {item.name}
                  </span>

                  <div>
                    Category :{item.category}
                  </div>
                  <div>
                    {item.description}
                  </div>
                  <div>
                    Total Price  ₹ {item.price}
                  </div>
                </div>



              </Grid>

            </Grid>
            }
            {
              stepNumber == 1 &&
              <>
                <div className="container">
                  <div className="centered-div">
                    <p>Select Address...</p>
                    <Select sx={{ width: "617px" }} value={selectedOption} >
                      {
                        address.map((data, index) => {
                          return (
                            <MenuItem onClick={() => { handleChange(data) }} value={data.name}>{data.name}--&#62;{data.street},{data.city}</MenuItem>
                          )
                        })
                      }


                    </Select>
                    <br />
                    <br />
                    <p style={{ "margin-left": "300px" }}>-OR-</p>
                  </div>
                </div>

                <p style={{ "margin-left": "412px", "font-size": "larger" }}>Add Address</p>
                <div className="container">
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          name="name"
                          autoComplete="name"
                          className='centered-textfield'
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="contact"
                          label="Contact Number"
                          name="contact"
                          autoComplete="contact"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="street"
                          label="Street"
                          name="street"
                          autoComplete="street"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          autoComplete="city"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="state"
                          label="State"
                          name="state"
                          autoComplete="state"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="landmark"
                          label="Landmark"
                          name="landmark"
                          autoComplete="landmark"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          required
                          fullWidth
                          id="zipCode"
                          label="Zip Code"
                          name="zipCode"
                          autoComplete="zipCode"
                        />
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 35, width: "400px" }}
                      >
                        SAVE ADDRESS
                      </Button>
                    </Grid>
                  </Box>
                </div>

              </>
            }
            {
              stepNumber == 2 &&
              <>
                <Grid container rowSpacing={1} columnSpacing={0.5}>
                  <Grid xs={8}>
                    <p>{item.name}</p>
                    <p>Quantity: {item.availableItems}</p>
                    <p>Category: {item.category}</p>
                    <p>{item.description}</p>
                    <p>Total Price ₹ {item.price}</p>

                  </Grid>
                  <Grid xs={4}>
                    <p>Address Details:</p>
                    <p>{selectedAddress.name}</p>
                    <p>Contact Number:{selectedAddress.contactNumber}</p>
                    <p>{selectedAddress.street},{selectedAddress.city}</p>
                    <p>{selectedAddress.state}</p>
                    <p>{selectedAddress.zipCode}</p>
                  </Grid>

                </Grid>
              </>
            }
          </Box>

        </div>
        <div className="fixed-div">
          <Button variant="text" onClick={() => { handlePrev() }}>BACK</Button>
          <Button variant="contained" onClick={() => { handleNext() }}>{stepNumber == 2 ? "PlaceOrder" : "NEXT"}</Button>
        </div>

      </div>
    </>
  );
}