import React from 'react';

import { Box,Button} from '@chakra-ui/core';
import { NavBar } from './NavBar';
import { RootState } from '../state/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getVerifyCode } from '../state/thunks/pluginThunk';


export const Settings = () => {
    const pluginState = useSelector((state: RootState) => state.pluginState.telegramVerify);
    const dispatch = useDispatch()
    const handleGetCode = async () => {
        await dispatch(getVerifyCode("telegram"))
      }
    return (
        <div>
        <NavBar />
        <Box
          marginLeft="5rem"
          backgroundColor="gray.800"
          height="100vh"
          color="white"
        >
            You can connect to Telegram integration bot by sending message /verify "yourcode" to https://telegram.me/memosnodejs_bot
           
          
            {pluginState?.code ? <div> Verify code : {pluginState.code} </div>: <div>Create verify code
            <Button onClick={handleGetCode}>Get Code</Button>
            </div>}
        </Box>
        </div>
    );
};
