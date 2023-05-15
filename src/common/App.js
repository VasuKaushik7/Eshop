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

function App() {
  return (
    <Router>
    
    <Routes>
                 <Route exact path='/' element={<Login/>}></Route>
                 {/* <Route exact path='/login' element={<Login/>}></Route> */}
                 <Route exact path='/signup' element={<Signup/>}></Route>
                 <Route exact path='/products' element={<Products/>}></Route>
            </Routes>
    </Router>

  );
}

export default App;
