import { NavBar } from './components/navbar/navbar';
import { Login } from './containers/login/login';
import { Register } from './containers/register/register';

import './App.css';

function App() {
  return (
    <div className="App">
      <div id="navbarDiv">
        <NavBar />
      </div>
      <Register />
      {/* <Login /> */}
    </div>
  );
}

export default App;
