import { combineReducers } from "@reduxjs/toolkit";
import LoggedInStateSlice  from "./slices/loginSlice"
import MemoSlice  from "./slices/memoSlice"
import panelSlice  from "./slices/panelSlice"
import mapSlice  from "./slices/mapSlice"
const rootReducer =combineReducers({ loginState: LoggedInStateSlice,
    memoState:MemoSlice,
    panelState:panelSlice,
    mapState: mapSlice
 });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;