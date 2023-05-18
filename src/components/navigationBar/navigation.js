import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { useState ,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function Navigation(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("props in navigation :",props);
    
        // setIsLoggedIn(true);
        useEffect(() => {
          
          
          if(props.loggedIn==true && isLoggedIn ==false){
            setIsLoggedIn(true);
            console.log("isLoggedin----->",isLoggedIn);
          }
        }, [props.loggedIn]);
      
    
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
    
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

    return (
        <>
        
            <AppBar sx={{ background: "#4050b5" }}>
                <Toolbar>
                    <ShoppingCartIcon />
                    <Typography sx={{ marginLeft: "10px" }}>
                        upGrad E-Shop
                    </Typography>
                    {!isLoggedIn && <Tabs sx={{ marginLeft: "auto" }} textColor="inherit">
                    <Link to="/"><Tab sx={{ background: "#fffff", textDecoration: "underline" }} label="Login"></Tab></Link>
                    <Link to="/signup"><Tab sx={{ background: "#fffff", textDecoration: "underline" }} label="Singup"></Tab></Link>
                    </Tabs>
                    }
                    {
                        isLoggedIn &&
                        <>
                         <Search  >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                        </Search>
                        <Tabs sx={{ marginLeft: "auto" }} textColor="inherit">
                        <Tab sx={{ background: "#fffff", textDecoration: "underline" }} label="Home"></Tab>
                        {isAdmin&&<Tab sx={{ background: "#fffff", textDecoration: "underline" }} label="Add Product"></Tab>}
                        <Button variant="contained" color="error">LOGOUT</Button>
                    </Tabs>

                        </>
                        
                    }

                </Toolbar>
            </AppBar>

            
           
        </>
    )
}

export default Navigation;