import React, { useEffect } from 'react';

import { Box,Button, Image, AspectRatioBox} from '@chakra-ui/core';
import { NavBar } from './NavBar';
import { RootState } from '../state/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getVerifyCode } from '../state/thunks/pluginThunk';
import { Header } from "./Header"
import { getMemos } from '../state/thunks/memoThunk';

export const Pictures = () => {

    const dispatch = useDispatch()
    const Memos = useSelector((state: RootState) => state.memoState.memos).filter(m => m.pictureID !== null)

    useEffect(() => {
        dispatch(getMemos())
    }, [dispatch])
    return (
        <div>
<NavBar/>
<Header/>
{Memos.map(m => {
   return(  <AspectRatioBox maxW="560px" ratio={1}>
   <Image src={m.Picture.pictureURL}></Image>
   </AspectRatioBox>) 
    
})}
        </div>
    );
};
{/* <Box size="sm">
  <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
</Box> */}