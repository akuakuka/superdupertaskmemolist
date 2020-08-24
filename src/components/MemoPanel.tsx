import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemos } from '../state/thunks/memoThunk';
import { Box, Heading } from "@chakra-ui/core";
import IPanel from '../models/Panel';
import { RootState } from '../state/rootReducer';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Memo } from './Memos/Memo';
import { MemoPanelHeader } from './Memos/MemoPanelHeader';
import { AddNewMemo } from "./Memos/AddNewMemo"

export interface IMemoPanelProps {
    panel: IPanel
}

export const MemoPanel = (props: IMemoPanelProps) => {
    //@ts-ignore
    const Memos = useSelector((state: RootState) => state.memoState.memos).filter(m => m.panelID === props.panel.panelID)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMemos())
    }, [dispatch])

    const handleMemos = () => {
        return Memos.map((memo, index) => (
            <Draggable
                key={memo.memoID}
                draggableId={memo.memoID}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Memo Memo={memo} />
                    </div>
                )}
            </Draggable>

        ));
    };

    return (
        <Droppable droppableId={props.panel.panelID} type="PANEL">

            {(provided, snapshot) => (

                <Box 
                ref={provided.innerRef}
                {...provided.droppableProps}
                    display="flex"
                    flexDirection="column"
                    margin="0 5px"
                    minHeight="400px"
                    height="50vh"
                    width="25%"
                    maxWidth="210px"
                    marginTop="15px"
                    marginLeft="15px"
                    borderRadius="3px"
                    backgroundColor="#3E3E3E61">

                    <Box padding="13px 10px 17px"
                        textTransform="uppercase"
                        color="white"
                        fontSize="12.5"
                        flexDirection="row"
                        display="flex"
                        margin="3px"
                        justifyContent="space-between"
                    >
                       <Box alignSelf="flex-start"> {props.panel.title}</Box>  
                       <Box alignSelf="flex-end"> {Memos.length}</Box>
                        
                    </Box>

                    {handleMemos()}


                </Box>


            )}

        </Droppable>


    );
};




