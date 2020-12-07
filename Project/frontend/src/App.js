import React from 'react';
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
import { Add } from './containers/add/add';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Router>
        <div id="navbarDiv">
          <NavBar />
        </div>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/cart" component={ Cart } />
          <Route path="/orders" component={ Orders } />
          <Route path="/add" component={ Add } />
          <Route path="/:productId" component={ Product } />
          <Route path="/" component={ Home } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
