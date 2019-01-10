import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/Landing';
import './App.css';



class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
