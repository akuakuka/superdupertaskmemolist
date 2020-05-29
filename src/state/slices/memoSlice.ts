import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IMemo from "../../models/Memo";


interface MemoSate {
    memos: IMemo[];
}

const initialState: MemoSate = {
    memos:[]
};

const LoggedInStateSlice = createSlice({
    name: 'memoState',
    initialState,
    reducers: {
        initMemos(state, action: PayloadAction<IMemo[]>) {
            console.log(action.payload)
            state.memos = action.payload;
            return state;
        },
        removeMemo(state, action: PayloadAction<IMemo>) {
            state.memos = state.memos.filter(m => m.memoID !== action.payload.memoID)
            return state;
        },
        addMemo(state, action: PayloadAction<IMemo>) {
            console.log(action.payload)
            state.memos.push(action.payload)
            return state;
        },
        updateMemo(state, action: PayloadAction<IMemo>) {
            state.memos = state.memos.filter(memo => memo.memoID !== action.payload.memoID);
            state.memos.push(action.payload);
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