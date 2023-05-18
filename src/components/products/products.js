import React, { useState ,useEffect} from "react";
import {
    useLocation,
    useNavigate
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
import axios from "axios";
function Product(){
    const [loggedIn,setLoggedIn]=useState(false);
    const [items,setItems]=useState([]);
    const [categories,setCategories]=useState([]);
    const navigate = useNavigate();
    console.log("token in product--->",useLocation().state);
    if(useLocation().state && loggedIn==false){
        setLoggedIn(true);
    }
    const [alignment, setAlignment] = React.useState(0);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/');
        console.log("response----->",response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/categories');
        console.log("response2----->",response.data);
        setCategories(response.data);
        // setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchData2();
  }, []);

  function goToDescription(data){
    console.log("data--------->",data);
    navigate('/productDescription', { state: { data:data }})
  }
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
      <ToggleButton value={0} >
      ALL
      </ToggleButton>
      {categories.map((data,index)=>
     
      
      <ToggleButton value={index+1}>
          {data}
        </ToggleButton>
       
      )
      }
    </ToggleButtonGroup>
    <p>Selected Option: {alignment}</p>
    {items.map((data,index)=>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: "300px" }}
        image={data.imageUrl}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}

          <Typography>
          {data.price}
        </Typography>
          
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" color="primary" onClick={()=>{goToDescription(data)}}>
      BUY
      </Button>
      </CardActions>
    </Card>)}
    </>
)
}

export default Product;