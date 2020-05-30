
import axios from 'axios';
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { initMemos, addMemo,removeMemo,updateMemo} from '../slices/memoSlice';
import IMemo from '../../models/Memo';
import { backendURL } from '../../config/config';
axios.defaults.withCredentials = true;
export type MemoThunnk = ThunkAction<void, RootState, null, Action<string>>;

interface memoCandiate {
    content:string
    title:string
} 

export const getMemos = (): MemoThunnk => async (dispatch) => {

    try {
        const { data } = await axios.get(`${backendURL}/memo/`,{withCredentials:true})
        await dispatch(initMemos(data))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};

export const reOrderMemos = (memos:IMemo[],panelID:string): MemoThunnk => async (dispatch) => {
    try {
        const response = await axios.request({ url: `${backendURL}/memo/reorder`, method: 'post', data: { memos:memos,panelID:panelID },withCredentials:true});
        //const { data:returndata } = await axios.put(`${backendURL}/memo/`,data:{memo},{withCredentials:true})
       console.log(response)
       
        dispatch(updateMemo(response.data))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
}

export const addNewMemo = (content:string,title:string,): MemoThunnk => async (dispatch) => {
    console.log("ADdingNewMemo")
    const data:memoCandiate = {content:content,title:title} 
    console.log(data)
    try {
            const response = await axios.request({ url: `${backendURL}/memo`, method: 'POST', data: { title, content },withCredentials:true});
            console.log(response)
            const newMemo:IMemo = response.data;
            dispatch(addMemo(newMemo))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};

export const deleteMemo = (memo:IMemo): MemoThunnk => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${backendURL}/memo/${memo.memoID}`,{withCredentials:true})
        dispatch(removeMemo(data))
    } catch(e) {
        console.log(e)
    } 
};

export const doUpdateMemo = (memo:IMemo): MemoThunnk => async (dispatch) => {
    try {
        const response = await axios.request({ url: `${backendURL}/memo/${memo.memoID}`, method: 'put', data: { memo },withCredentials:true});
        //const { data:returndata } = await axios.put(`${backendURL}/memo/`,data:{memo},{withCredentials:true})
       console.log(response)
       
        dispatch(updateMemo(response.data))
      //  console.log(response.data.token)
    } catch(e) {
        console.log(e)
    } 
};