import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_STATUS } from '../state/slices/loginSlice';
//@ts-ignore
const PrivateRoute = ({ component: Component, loginState, ...rest }) => {
    // const loginStatus: LOGIN_STATUS = useSelector((state: RootState) => state.loginState.loggedIn);
    // const user: LOGIN_STATUS = useSelector((state: RootState) => state.loginState.user);
    console.log(loginState)
    return (
        <Route {...rest} render={props => (
            loginState === LOGIN_STATUS.LOGGED_IN ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;