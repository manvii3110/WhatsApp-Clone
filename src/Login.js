import React from 'react'
import {Button} from '@material-ui/core';
import './Login.css';
import { auth, provider } from './firebase';
import {useStateValue} from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{}, dispatch]=useStateValue();
    const SignIn = () => {
        auth.signInWithPopup(provider)
        .then((result)=> {dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        });
        })
        .catch((error)=> alert(error.message));
    };
    return (
        <div className="login">
        <div className="login__container">
        <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="login__logo" />
        <div className="login__text">
        <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={SignIn}>Sign In With Google</Button>
        </div>
        </div>
    )
}

export default Login;
