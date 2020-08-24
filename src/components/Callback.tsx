import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import { getUser } from '../state/thunks/loginThunk';
import { Redirect } from 'react-router';
import { LOGIN_STATUS } from '../state/slices/loginSlice';


export const Callback: React.FC = () => {
    const login = useSelector((state: RootState) => state.loginState.loggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserAsync = async () => {
            await dispatch(getUser())
        }
        getUserAsync()
    });

    return (
        <div className="container">
            {login === LOGIN_STATUS.LOGGED_IN ? <Redirect to='/main' /> : <div> Wait for redirect!... </div>}
        </div>
    )
};