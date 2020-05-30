
import axios from 'axios';
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { LOGIN_STATUS, setLoginStatus, setUser, setLoginError, setSignupError } from '../slices/loginSlice';
import wait from 'waait';
import { backendURL } from '../../config/config';
export type LoginThunk = ThunkAction<void, RootState, null, Action<string>>;

export const doLogin = (username: string, password: string): LoginThunk => async (dispatch) => {
    const data = { username: username, password: password }
    try {
        
        const response = await axios.post(`${backendURL}/auth/local/login`, data)
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_IN));
        dispatch(setUser(response.data.token));
        //  console.log(response.data.token)
    } catch (e) {
        dispatch(setLoginError(e.message))
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
        await wait(1500);
        dispatch(setLoginError(undefined!))
        console.log(e)
    }
};

export const getUser = (): LoginThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${backendURL}/user`, { withCredentials: true });
        console.log(response)
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_IN));
        dispatch(setUser(response.data));
        return response;
    } catch (e) {
        console.log(e)
        dispatch(setLoginError(e))
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    }
};
export const doGoogleSigin = (): LoginThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${backendURL}/auth/google`);
        console.log(response)
        return response;
    } catch (e) {
        console.log(e)
        dispatch(setLoginError(e))
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    }
};
export const doSignup = (username: string, password: string): LoginThunk => async (dispatch) => {
    const data = { username: username, password: password }
    try {
        const response = await axios.post(`${backendURL}/auth/local/register`, data,{withCredentials:true})
        const token = `Bearer ${response.data.token}`
        axios.defaults.headers.authentication = token;
        localStorage.setItem('token', token)
        console.log(axios.defaults)
        console.log(token)
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_IN));
        dispatch(setUser(response.data.token));
        //  console.log(response.data.token)
    } catch (e) {
        dispatch(setSignupError(e.message))
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
        await wait(3000);
        dispatch(setSignupError(undefined!))
        console.log(e)
    }

};
