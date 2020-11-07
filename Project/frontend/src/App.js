import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { NavBar } from './components/navbar/navbar';
import { Login } from './containers/login/login';
import { Register } from './containers/register/register';
import { Home } from './containers/home/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="navbarDiv">
        <NavBar />
      </div>
      <Router>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/" component={ Home } /> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
