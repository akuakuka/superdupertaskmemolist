
import axios from 'axios';
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { backendURL } from '../../config/config';
import { setTelegramVerify } from '../slices/pluginSlice';

export type PluginThunk = ThunkAction<void, RootState, null, Action<string>>;




export const getVerifyCode = (plugin:string): PluginThunk => async (dispatch) => {
try {
const response = await axios.get(`${backendURL}/user/verify/${plugin}`)
dispatch(setTelegramVerify(response.data))
} catch(e) {
console.log(e)
}
};