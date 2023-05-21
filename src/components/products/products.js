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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { token } from '../login/login'
import { isAnAdmin } from '../login/login';

export let categoriesGlobal=[];
function Product(){
    const [loggedIn,setLoggedIn]=useState(false);
    const [items,setItems]=useState([]);
    const [orginalData,setOriginalData]=useState([]);
    const [categories,setCategories]=useState([]);
    const navigate = useNavigate();
    const [orderPlaced,setOrderPlaced]=useState(false);
    const [productModified,setProductModified]=useState(false);
    const [productAdded,setProductAdded]=useState(false);
    const [open, setOpen] = React.useState(true);
    const [modified, setModified] = React.useState(true);
    const [added, setAdded] = React.useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    // console.log("token in product--->",useLocation().state);
    // let token=useLocation().state.token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let temp1=useLocation();
    if(token==null){
      navigate('/')
    }
    else{
      // console.log("temp1----------->",temp1,temp1.state.productAdded);
     
      if(temp1.state && temp1.state.order){
        if(orderPlaced==false){
        setOrderPlaced(true);
          setTimeout(() => {
            setOpen(false);
          }, 5000);
        }
     
      }
      if(temp1.state && temp1.state.productAdded){
        console.log("inside product added if")
        if(productAdded==false){
        setProductAdded(true);
        setTimeout(() => {
          setAdded(false);
        }, 5000);
      }
      }
      if(temp1.state && temp1.state.productModified){
        console.log("inside product modified if")
        if(productModified==false){
        setProductModified(true);
        setTimeout(() => {
          setModified(false);
        }, 5000);
      }
      }
      if(loggedIn==false){
      setLoggedIn(true);
      }
      if(isAdmin==false && isAnAdmin==true ){
        setIsAdmin(true);
      }
    }

    // if(useLocation().state && loggedIn==false){
    //     if(temp1.state.order){
          // setOrderPlaced(true);
          // setTimeout(() => {
          //   setOpen(false);
          // }, 5000);
    //     }
       
        // setLoggedIn(true);
    // }
    // if(temp1.state.isAdmin && isAdmin==false){
    //   setIsAdmin(true);
    // }
    const [alignment, setAlignment] = React.useState(0);

  const handleAlignment = (event, newAlignment) => {
    console.log("newAlignment----->",newAlignment)
    if(newAlignment==null || newAlignment==0){
      setItems(orginalData);
    setAlignment(newAlignment);
    }
    else{
      let categorySelected=categories[newAlignment-1];
      console.log("categorySelected-----",categorySelected,categories);
      const filteredData = orginalData.filter(item => item.category==categorySelected);
      setItems(filteredData);
      console.log("items----->",items);
      console.log("filteredData------>",filteredData);
    }

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/');
        console.log("response----->",response.data);
        setItems(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/categories');
        console.log("response2----->",response.data);
        categoriesGlobal=[];
        for(let i=0 ;i<response.data.length;i++){
          categoriesGlobal.push({"value":response.data[i] ,"label":response.data[i]})
        }
        setCategories(response.data);
        // setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchData2();
  }, []);

  function fetchNewData(){
    // useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/products/');
          console.log("response----->",response.data);
          setItems(response.data);
          setOriginalData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const fetchData2 = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/products/categories');
          console.log("response2----->",response.data);
          categoriesGlobal=[];
          for(let i=0 ;i<response.data.length;i++){
            categoriesGlobal.push({"value":response.data[i] ,"label":response.data[i]})
          }
          setCategories(response.data);
          // setItems(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
      fetchData2();
    // }, []);
  }

  function goToDescription(data){
    console.log("data--------->",data);
    navigate('/productDescription', { state: { data:data }})
  }
  const handleSearch = (value) => {
    console.log("value in products----->",value);
    const filteredData = orginalData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log('Filtered Data:', filteredData);
    setItems(filteredData);

    };

  function handleDelete(id){
     axios.delete("http://localhost:8080/api/products/"+id).then((response) => {
    console.log("deleted")
    fetchNewData();
  }).catch(error=>{})
  }
   function handleModify(data){
    navigate('/modify', { state: { data:data }})
   }
return(
    <>
        <Navigation loggedIn={loggedIn} isAdmin={isAdmin} callSearch={handleSearch}/>
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
    {orderPlaced&& <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity="success" sx={{ width: '100%' }}>
          Order placed successfully
        </Alert>
      </Snackbar>}
      {productAdded&& <Snackbar open={added} autoHideDuration={6000} >
        <Alert severity="success" sx={{ width: '100%' }}>
         Product Added successfully.
        </Alert>
      </Snackbar>}
      {productModified&& <Snackbar open={modified} autoHideDuration={6000} >
        <Alert severity="success" sx={{ width: '100%' }}>
         Product Modified successfully.
        </Alert>
      </Snackbar>}
    {/* <p>Selected Option: {alignment}</p> */}
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
      <EditIcon sx={{"color": "gray"}} onClick={()=>{handleModify(data)}}></EditIcon>
      <DeleteIcon sx={{"color": "gray"}} onClick={()=>{handleDelete(data.id)}}></DeleteIcon>
      </CardActions>
    </Card>)}
    </>
)
}

export default Product;