import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemos } from '../state/thunks/memoThunk';
import { Box } from "@chakra-ui/core";
import IPanel from '../models/Panel';
import { RootState } from '../state/rootReducer';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Memo } from './Memos/Memo';
import { MemoPanelHeader } from './Memos/MemoPanelHeader';
import { AddNewMemo } from './Memos/AddNewMemo';

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
                    backgroundColor="gray.900"
                    {...provided.droppableProps}
                    width="200px"
                    minWidth="100px"
                    minHeight="240px"
                    maxHeight="600px"
                    margin="12px"

                >
                    <Box height="30px" backgroundColor="purple.900">
                        <MemoPanelHeader title={props.panel.title} panelID={props.panel.panelID}></MemoPanelHeader>
                        {/* <Text color="white" textAlign="center">{props.panel.title}</Text> */}
                    </Box>
                    {handleMemos()}
                    {provided.placeholder}
                    {props.panel.default ?
                        <AddNewMemo /> : <></>}

                </Box>


            )}

        </Droppable>


    );
};




