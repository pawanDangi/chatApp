import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chatting from '../components/Chatting';
import IM from '../components/IM';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Chatting}/>
        <Route path='/IM' component={IM}/>
      </Switch>    
    )
  }
};
