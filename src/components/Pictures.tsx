import React, { useEffect } from 'react';

import { Box,Button, Image, AspectRatioBox,SimpleGrid} from '@chakra-ui/core';
import { NavBar } from './NavBar';
import { RootState } from '../state/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getVerifyCode } from '../state/thunks/pluginThunk';
import { Header } from "./Header"
import { getMemos } from '../state/thunks/memoThunk';

export const Pictures = () => {

    const dispatch = useDispatch()
    const PictureMemos = useSelector((state: RootState) => state.memoState.memos).filter(m => m.pictureID !== null)

    useEffect(() => {
        dispatch(getMemos())
    }, [dispatch])
    return (
        <div>
<NavBar/>
<Header/>         
   <Box width="100%" display="flex" marginBottom="10px" height="100vh" position="absolute" marginLeft="70px" backgroundColor="#181818">


<SimpleGrid minChildWidth="120px" spacing="40px">
{PictureMemos.map(m => {
    return(  <AspectRatioBox maxWidth="120px" maxHeight="120px" ratio={1}>
    <Image src={m.Picture.pictureURL}></Image>
    </AspectRatioBox>) 
     
 })}
</SimpleGrid>
</Box>


        </div>
    );
};
{/* <Box size="sm">
  <Image src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
</Box> */}