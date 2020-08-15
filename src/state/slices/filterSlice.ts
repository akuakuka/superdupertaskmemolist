import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IFilterState {
    filter: string;
}

const initialState: IFilterState = {
    filter: ""
};

const FilterSlice = createSlice({
    name: 'filterState',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
            return state;
        },

    },
});

export const {
    setFilter,
} = FilterSlice.actions;

export default FilterSlice.reducer;