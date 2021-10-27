import './App.css';
import Login from '../src/pages/login/Login'
import Common from './pages/common/Common';
import Signup from './pages/signup/Signup'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route path="/Common" component={Common}></Route>
          
        </Switch>
        </Router>
      {/* <Login/> */}
      
    </div>
  );
}

export default App;
