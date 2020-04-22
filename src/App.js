import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/NavBar'
import Dashboard from './components/dashboard/dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SihnUp'
import CreateProject from './components/projects/CreateProject'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class App extends Component {
  render(){
    const {auth} = this.props;
    if(auth.isLoaded){
      return (
        <BrowserRouter>
          <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
          </Switch>
        </div>
        </BrowserRouter>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth
});

export default compose(firebaseConnect(), connect(mapStateToProps))(App);
