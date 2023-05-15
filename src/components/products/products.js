import React, { useState } from "react";
import {
    useLocation
  } from 'react-router-dom';
import Navigation from '../navigationBar/navigation';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Product(){
    const [loggedIn,setLoggedIn]=useState(false);
    console.log("token in product--->",useLocation().state);
    if(useLocation().state && loggedIn==false){
        setLoggedIn(true);
    }
    const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
return(
    <>
        <Navigation loggedIn={loggedIn}/>
        <p>Products Page...</p>
        <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
      ALL
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
       APPAREL
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        ELECTRONICS
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" >
       PERSONAL CARE
      </ToggleButton>
    </ToggleButtonGroup>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </>
)
}

export default Product;