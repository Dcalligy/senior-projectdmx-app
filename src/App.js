import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/forms/Welcome';
import Navbar from './components/Navbar';
//import Groups from './components/Welcome';
import Login from './components/forms/Login';
import CreateAccount from './components/forms/CreateAccount';
import Footer from './components/Footer';
import {render} from '@testing-library/react';
import Amplify, { Auth }  from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
              <Switch>
                <Route exact path="/" component={CreateAccount}/>
                <Route exact path="/welcome" component={Welcome}/>
              </Switch>
              <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;