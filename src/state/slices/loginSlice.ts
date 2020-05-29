import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

export enum LOGIN_STATUS {
    CHECKING_LOGIN_STATUS, LOGGED_IN, LOGGED_OUT,
}

interface ILoginState {
    loggedIn: LOGIN_STATUS;
    user: User | undefined;
    loginError: string | undefined;
    signupError: string | undefined;
}

const initialState: ILoginState = {
    loggedIn: LOGIN_STATUS.CHECKING_LOGIN_STATUS,
    user: undefined,
    loginError: undefined,
    signupError: undefined
};

const LoggedInStateSlice = createSlice({
    name: 'loginState',
    initialState,
    reducers: {
        setLoginStatus(state, action: PayloadAction<LOGIN_STATUS>) {
            state.loggedIn = action.payload;
            return state;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            return state;
        },
        setLoginError(state, action: PayloadAction<string>) {
            state.loginError = action.payload;
            return state;
        },
        setSignupError(state, action: PayloadAction<string>) {
            state.signupError = action.payload;
            return state;
        },
    },
});

export const {
    setLoginStatus,
    setUser,
    setLoginError,
    setSignupError
} = LoggedInStateSlice.actions;

export default LoggedInStateSlice.reducer;