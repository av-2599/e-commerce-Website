import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { NavBar } from './components/navbar/navbar';
import { Login } from './containers/login/login';
import { Register } from './containers/register/register';
import { Home } from './containers/home/home';
import { Product } from './containers/product/product';
import { Cart } from './containers/cart/cart';
import { Orders } from './containers/orders/orders';
import { GuardRoute } from './Routes/GuardRoute';
import { getToken } from './config/token';
import './App.css';

function App() {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  
  useEffect(() => {
    (getToken() ? setIsAuthenticated(true) : setIsAuthenticated(false));
  }, [isAuthenticated])

  return (
    <div className="App">
      <div id="navbarDiv">
        <NavBar />
      </div>
      <Router>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <GuardRoute path="/cart" component={ Cart } auth={ isAuthenticated }/>
          <GuardRoute path="/orders" component={ Orders } auth={ isAuthenticated }/>
          <Route path="/:productId" component={ Product } />
          <Route path="/" component={ Home } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
