import React, { Profiler } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const SignedInLinks = (props) => {
    const handleSignOut = () => {
        const { firebase } = props;
        props.signOut(firebase);
    };
    return(
        <ul className="right">
            <li><NavLink to='/create'>New Project</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>{props.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default compose(firebaseConnect(), connect(null, mapDispatchToProps))(SignedInLinks);