import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Department} from './Department/Department';
import {Employee} from './Employee/Employee';
import {Country} from './Country/Country';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       React JS Tutorial
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/department/department' component={Department}/>
       <Route path='/employee/employee' component={Employee}/>
       <Route path='/country/country' component={Country}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
