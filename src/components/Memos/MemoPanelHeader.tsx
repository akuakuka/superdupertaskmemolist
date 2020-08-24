import React, { useState } from 'react';

import { Box,IconButton, Flex, Text, Popover, PopoverTrigger, PopoverArrow, PopoverBody, PopoverContent, Input, PopoverCloseButton, useToast } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updatePanelTitle, removePanel } from '../../state/thunks/panelThunk';
import { RootState } from '../../state/rootReducer';

interface MemoPanelHeaderProps {
    title: string
    panelID: string
}

export const MemoPanelHeader = (props: MemoPanelHeaderProps) => {
    const Memos = useSelector((state: RootState) => state.memoState.memos.filter(mm => mm.panelID === props.panelID))
    const [panelTitle, setPanelTitle] = useState("")
    const [deletePanelError, setDeletePanelError] = useState("")
    //@ts-ignore
    const handlePanelTitleChange = event => setPanelTitle(event.target.value);
    const dispatch = useDispatch();

    const handlePanelNameChange = () => {
        dispatch(updatePanelTitle(panelTitle, props.panelID))
    }
    const handlePanelDelete = () => {
        if (Memos.length > 0) {
            setDeletePanelError("Cant delete panel with memos!")
           
        } else {
            dispatch(removePanel(props.panelID))
        }

    }
    const toast = useToast();
    return (

        <Flex>
            <Text textAlign="center" fontSize="l" flexDirection="row" color="white"> {props.title} </Text>
            <Box alignSelf="flex-end" >
                <Popover>
                    <PopoverTrigger>
                        <IconButton aria-label="add new panel" icon="add" size="xs" marginTop="10px" />
                    </PopoverTrigger>
                    <PopoverContent zIndex={4}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>Input new Panel header</PopoverBody>
                        <Input onChange={handlePanelTitleChange}></Input>
                        <IconButton aria-label="change panel title" icon="check" size="xs" marginTop="10px" onClick={handlePanelNameChange} />
                        <IconButton aria-label="delete panel" icon="delete" size="xs" marginTop="10px" onClick={handlePanelDelete} />
                    </PopoverContent>
                </Popover>
            </Box>
            {deletePanelError ? toast({
                title: "An error occurred.",
                description: deletePanelError,
                status: "error",
                duration: 9000,
                isClosable: true,
            }) : <></>}
        </Flex>


    )
}

// <IconButton aria-label="add new panel" icon="add" size="xs"  marginTop="10px" onClick={addPanel}/>