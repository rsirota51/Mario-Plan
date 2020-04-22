import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn }  from '../../store/actions/authActions'
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        const {target} = e;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        const { firebase } = props;
        const credentials = { ...state };
        const authData = {
            firebase,
            credentials,
        };
        props.signIn(authData);
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign In</h5>  
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div> 
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div> 
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">LogIn</button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
