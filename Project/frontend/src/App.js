import { Login } from './containers/login';
import { NavBar } from './components/navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="navbarDiv">
        <NavBar />
      </div>
      <Login />
    </div>
  );
}

export default App;
