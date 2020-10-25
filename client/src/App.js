import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import { AuthContext } from './context/authContext';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

const App = () => {

  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      {isAuthenticated ? <Navbar /> : null}
      <UnPrivateRoute exact path="/" component={LandingPage} />
      <PrivateRoute exact path='/home' component={Home} />
      {/* <Route path="/" component={LandingPage} exact />
      <Route path="/home" component={Home} exact /> */}
    </Router>
  )
}

export default App
