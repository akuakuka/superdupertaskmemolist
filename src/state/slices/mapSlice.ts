import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ILocation from "../../models/Location";


interface LocationState {
    locations: ILocation[];
}

const initialState: LocationState = {
    locations:[]
};

const LocationSlice = createSlice({
    name: 'locationState',
    initialState,
    reducers: {
        initLocations(state, action: PayloadAction<ILocation[]>) {
            console.log(action.payload)
            state.locations = action.payload;
            return state;
        },
        deleteLocation(state, action: PayloadAction<ILocation>) {
            console.log(action.payload)
            state.locations = state.locations.filter((l)=> l.locationID !== action.payload.locationID)
            return state;
        },
    },
});

export const {
    initLocations
} = LocationSlice.actions;

export default LocationSlice.reducer;