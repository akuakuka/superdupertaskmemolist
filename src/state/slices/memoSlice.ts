import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMemo from "../../models/Memo";


interface MemoSate {
    memos: IMemo[];
}

const initialState: MemoSate = {
    memos:[]
};


const sortMemos  = ( a:IMemo, b:IMemo ) => {
    if ( a.panelIndex < b.panelIndex ){
      return -1;
    }
    if ( a.panelIndex > b.panelIndex ){
      return 1;
    }
    return 0;
  }

const LoggedInStateSlice = createSlice({
    name: 'memoState',
    initialState,
    reducers: {
        initMemos(state, action: PayloadAction<IMemo[]>) {
            action.payload.sort( sortMemos );
            state.memos = action.payload;
            return state;
        },
        removeMemo(state, action: PayloadAction<IMemo>) {
            state.memos = state.memos.filter(m => m.memoID !== action.payload.memoID)
            return state;
        },
        addMemo(state, action: PayloadAction<IMemo>) {
           
            state.memos.push(action.payload)
            return state;
        },
        updateMemo(state, action: PayloadAction<IMemo>) {
            state.memos = state.memos.filter(memo => memo.memoID !== action.payload.memoID);
            state.memos.push(action.payload);
            state.memos.sort(sortMemos)
            console.log(action.payload)
            return state;
        },
        setMemoState(state,action:PayloadAction<IMemo[]>)  {
            state.memos = action.payload;
            return state;
        }
    },
});

export const {
    initMemos,
    removeMemo,
    addMemo,
    setMemoState,
    updateMemo
} = LoggedInStateSlice.actions;

export default LoggedInStateSlice.reducer;