import React , { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Navigation from "../navigationBar/navigation"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import './createOrder.css'

const steps = [
    'Items',
    'Select Address',
    'Confirm Order',
];
let stepNumber = 1;

export default function CreateOrder() {
    const location = useLocation();
    const item = location.state;
    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value)
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        
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
                <Select sx={{width:"617px"}} value={selectedOption} onChange={handleChange}>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                </Select>
                <br/>
                <br/>
                <p style={{"margin-left": "300px"}}>-OR-</p>
                </div>
                </div>
                
                <p style={{ "margin-left": "412px","font-size": "larger"}}>Add Address</p>
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
                        sx={{ mt: 3, mb: 2,ml:35,width:"400px"}}
                    >
                      SAVE ADDRESS
                    </Button>
                    </Grid>
                    </Box>
                </div>
                
                </>
            }
            </Box>
            
            </div>
            <div className="fixed-div">
            <Button variant="text">BACK</Button>
            <Button variant="contained">NEXT</Button>
            </div>
       
        </div>
        </>
    );
}