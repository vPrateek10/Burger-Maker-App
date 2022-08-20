import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    };
}

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    return{
        type:actionTypes.LOGOUT
    }
}

export const checkAuthTimeout=(expTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expTime*1000);
    }
}

export const auth=(email, password, isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhA4BLmb-fWcEkg52qP0E5sioh74fyz9E';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhA4BLmb-fWcEkg52qP0E5sioh74fyz9E'
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error.response.data.error));
        });
    }
}

