
import axios from 'axios';
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { backendURL } from '../../config/config';

export type PluginThunk = ThunkAction<void, RootState, null, Action<string>>;




export const getVerifyCode = (plugin:string): PluginThunk => async (dispatch) => {
try {
const response = await axios.get(`${backendURL}/user/verify/${plugin}`)
console.log(response)

} catch(e) {
console.log(e)
}
};