
import axios from 'axios';
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { initPanels, addPanel, updatePanel } from '../slices/panelSlice';
import IPanel from '../../models/Panel';

export type PanelThunk = ThunkAction<void, RootState, null, Action<string>>;


export const getPanels = (): PanelThunk => async (dispatch) => {
console.log("Thunkin sisäl")
    try {
        const { data } = await axios.get("http://localhost:3000/panel/",{withCredentials:true})
        console.log("Get Panels?=")
        console.log(data)
        await dispatch(initPanels(data))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};

export const addNewPanel = (title:string,): PanelThunk => async (dispatch) => {
 
    try {
            const response = await axios.request({ url: 'http://localhost:3000/panel', withCredentials:true ,method: 'POST', data: { title }});
            console.log(response)
            const newPanel:IPanel = response.data;
            dispatch(addPanel(newPanel))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};

export const removePanel = (): PanelThunk => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:3000/panel/",{withCredentials:true})
        dispatch(initPanels(data))
    } catch(e) {
        console.log(e)
    } 
};

export const updatePanelTitle = (title:string): PanelThunk => async (dispatch) => {
    try {
        const { updatedPanel } = await axios.post("http://localhost:3000/panel/",{title:title},{withCredentials:true})
        dispatch(updatePanel(updatedPanel))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};