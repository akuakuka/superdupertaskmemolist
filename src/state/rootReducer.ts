import { combineReducers } from "@reduxjs/toolkit";
import LoggedInStateSlice  from "./slices/loginSlice"
import MemoSlice  from "./slices/memoSlice"
import panelSlice  from "./slices/panelSlice"
import mapSlice  from "./slices/mapSlice"
import pluginSlice  from "./slices/pluginSlice"
import filterSlice  from "./slices/filterSlice"

const rootReducer = combineReducers({ loginState: LoggedInStateSlice,
    memoState:MemoSlice,
    panelState:panelSlice,
    mapState: mapSlice,
    pluginState:pluginSlice,
    filterState: filterSlice
 });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;