import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVerifyCode {
    type: string
    userID:string
    verifyPluginID:string
    code:string
}
// type(pin): "telegram"
// userID(pin): "9bc88ffb-78a3-45c0-bc0c-19c957ebdb05"
// VerifyPluginID(pin): "f681f86c-67ab-45fe-b0b9-d88b18f38dea"
// code(pin): "20795"
interface IPluginState {
    telegramVerify: IVerifyCode | undefined;
}

const initialState: IPluginState = {
    telegramVerify: undefined
};

const LoggedInStateSlice = createSlice({
    name: 'pluginState',
    initialState,
    reducers: {
        setTelegramVerify(state, action: PayloadAction<IVerifyCode>) {
            state.telegramVerify = action.payload;
            return state;
        },

    },
});

export const {
    setTelegramVerify,
} = LoggedInStateSlice.actions;

export default LoggedInStateSlice.reducer;