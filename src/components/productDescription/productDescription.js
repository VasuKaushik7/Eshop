import Navigation from "../navigationBar/navigation"
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from "react";
import {
    useLocation,
    useNavigate,
    Link
} from 'react-router-dom';
import './productDescription.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function ProductDescription() {
    let item;
    console.log("data in productDescription--->", useLocation().state.data);
    // console.log("-------->image____",items[0].imageUrl)

    item = useLocation().state.data;


    return (
        <>
            <Navigation loggedIn={true} />
            <p>Product description...</p>
            <br />

            <Grid container spacing={2}>
                <Grid xs={4}>
                    <img
                        src={item.imageUrl} />
                </Grid>
                <Grid xs={8}>
                    <div className="description">
                        <span className="productName">
                            {item.name}
                        </span>
                        <span className="available">
                            Avaiable Quantity: {item.availableItems}
                        </span>
                        <div>
                            Category :{item.category}
                        </div>
                        <div>
                            {item.description}
                        </div>
                        <div>
                            {item.price}
                        </div>
                    </div>
                    <div>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Enter Qantity"
                            name="email"
                            autoComplete="email"
                        />
                    </div>
                    <Link to="/createOrder" state={item}    >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 ,width:"200px"}}
                    >
                       Place Order
                    </Button>
                    </Link>
                </Grid>

            </Grid>
        </>
    )
}