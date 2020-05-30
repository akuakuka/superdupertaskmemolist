
import axios from 'axios';
import { Action,ThunkAction } from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';
import { initLocations } from '../slices/mapSlice';
import { backendURL } from '../../config/config';


export type LocationThunk = ThunkAction<void, RootState, null, Action<string>>;

export const getLocations = (): LocationThunk => async (dispatch) => {

    try {
        const { data } = await axios.get(`${backendURL}/location/`,{withCredentials:true})
        console.log("GETLOCATIONS?=")
        console.log(data)
        await dispatch(initLocations(data))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};
export const deleteLocation = (locationid:string): LocationThunk => async (dispatch) => {
    console.log("DELETELOCATION")
    try {
        const { data } = await axios.delete(`${backendURL}/location/${locationid}`,{withCredentials:true})
        console.log("GETLOCATIONS?=")
        console.log(data)
        await dispatch(deleteLocation(locationid))
    } catch(e) {
        console.log(e)
    }
}