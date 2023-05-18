import logo from './logo.svg';
import './App.css';
import Login from '../components/login/login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Signup from "../components/signup/signup"
import Products from "../components/products/products"
import ProductDescription from '../components/productDescription/productDescription';
import CreateOrder from '../components/createOrder/createOrder';

function App() {
  return (
    <Router>
    
    <Routes>
                 <Route exact path='/' element={<Login/>}></Route>
                 {/* <Route exact path='/login' element={<Login/>}></Route> */}
                 <Route exact path='/signup' element={<Signup/>}></Route>
                 <Route exact path='/products' element={<Products/>}></Route>
                 <Route exact path='/productDescription' element={<ProductDescription/>}></Route>
                 <Route exact path='/createOrder' element={<CreateOrder/>}></Route>

            </Routes>
    </Router>

  );
}

export default App;
