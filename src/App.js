// import logo from './logo.svg';
import './App.css';
import Login from './majors/Login';
import Regs from './majors/Regs.jsx';
// import Manager from './majors/Manager.jsx';
import {Switch,Route, Redirect} from 'react-router-dom'
// import Home from './majors/manager/Home';
import Manager from './majors/Manager';
// crypto-js用于加密
function App() {
 
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/regs" component={Regs}></Route>
        <Route path="/manager" component={Manager}></Route>
        <Redirect from="/" to="/login" exact/>
      </Switch>
    </div>
  );
}

export default App
