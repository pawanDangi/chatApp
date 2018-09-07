import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainHeader from './MainHeader';
import AppFooter from './AppFooter';
import Routes from '../routes/Routes'

const App = () => (
  <Router>
    <div className="main">
      <MainHeader />
      <Routes />
      <AppFooter />
    </div>
  </Router>
);

export default App;
