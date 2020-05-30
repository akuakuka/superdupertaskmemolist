
import axios from 'axios';
import { Action,ThunkAction} from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';
import { initPanels, addPanel, updatePanel } from '../slices/panelSlice';
import IPanel from '../../models/Panel';
import { backendURL } from '../../config/config';

export type PanelThunk = ThunkAction<void, RootState, null, Action<string>>;


export const getPanels = (): PanelThunk => async (dispatch) => {
    try {
        const { data } = await axios.get(`${backendURL}/panel/`, { withCredentials: true })
        console.log("Get Panels?=")
        await dispatch(initPanels(data))
        //  console.log(response.data.token)
    } catch (e) {
        console.log(e)
    }
};

export const addNewPanel = (title: string, ): PanelThunk => async (dispatch) => {

    try {
        const response = await axios.request({ url: `${backendURL}/panel`, withCredentials: true, method: 'POST', data: { title } });
        const newPanel: IPanel = response.data;
        dispatch(addPanel(newPanel))
        //  console.log(response.data.token)
    } catch (e) {
        console.log(e)
    }
};

export const removePanel = (panelID:string): PanelThunk => async (dispatch) => {
    console.log("remove panel thunk")
    try {
        const { data } = await axios.delete(`${backendURL}/panel/${panelID}`, { withCredentials: true })
        console.log(data)
        //dispatch(initPanels(data))
    } catch (e) {
        console.log(e)
    }
};

export const updatePanelTitle = (title: string,panelID:string): PanelThunk => async (dispatch) => {
    try {
        const { updatedPanel } = await axios.put(`${backendURL}/panel/${panelID}`, { title: title }, { withCredentials: true });
        console.log(updatedPanel)
        dispatch(updatePanel(updatedPanel))
        //  console.log(response.data.token)
    } catch (e) {
        console.log(e)
    }
};