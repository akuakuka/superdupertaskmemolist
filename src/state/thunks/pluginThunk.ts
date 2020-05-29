
import axios from 'axios';
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';

export type PluginThunk = ThunkAction<void, RootState, null, Action<string>>;




export const getVerifyCode = (plugin:string): PluginThunk => async (dispatch) => {
try {
const response = await axios.get(`http://localhost:3000/user/verify/${plugin}`)
console.log(response)

} catch(e) {
console.log(e)
}
};