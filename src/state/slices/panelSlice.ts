import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IPanel from '../../models/Panel';

interface PanelState {
    panels: IPanel[];
}

const initialState: PanelState = {
    panels:[]
};

const PanelStateSlice = createSlice({
    name: 'panelState',
    initialState,
    reducers: {
        initPanels(state, action: PayloadAction<IPanel[]>) {
            state.panels = action.payload;
            return state;
        },
        removePanel(state, action: PayloadAction<IPanel>) {
            state.panels = state.panels.filter(m => m.panelID !== action.payload.panelID)
            return state;
        },
        addPanel(state, action: PayloadAction<IPanel>) {
            console.log(action.payload)
            state.panels.push(action.payload)
            return state;
        },
        updatePanel(state, action: PayloadAction<IPanel>) {
            console.log("slicen sisäl")
            console.log(action)
            state.panels = state.panels.filter(panels => panels.panelID !== action.payload.panelID);
            state.panels.push(action.payload);
            return state;
        }

    },
});

export const {
    initPanels,
    removePanel,
    addPanel,
    updatePanel,
} = PanelStateSlice.actions;

export default PanelStateSlice.reducer;