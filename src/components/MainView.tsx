import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  doUpdateMemo, reOrderMemos } from '../state/thunks/memoThunk';
import { NavBar } from './NavBar';
import { MemoPanel } from './MemoPanel';
import { Box, Input, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/core';
import { RootState } from '../state/rootReducer';
import { DragDropContext } from 'react-beautiful-dnd';
import IMemo from '../models/Memo';
import { setMemoState } from '../state/slices/memoSlice';
import { getPanels, addNewPanel } from '../state/thunks/panelThunk';
import { Header } from "./Header"



export const MainView = () => {
    const [panelTitle, setPanelTitle] = useState("")
    const Panels = useSelector((state: RootState) => state.panelState.panels);
    const Memos = useSelector((state: RootState) => state.memoState.memos);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getPanels())

    }, [dispatch])

    // const getPanelsMemos = (panelID: string): IMemo[] => {
    //     return Memos.filter(m => m.panelID === panelID)
    // }
    //@ts-ignore
    const handlePanelTitleChange = event => setPanelTitle(event.target.value);

    const reorder = (list: any, startIndex: number, endIndex: number, panelID: string): IMemo[] => {
        const result: IMemo[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const moveMemo = (memo: IMemo, droppableSource: any, droppableDestination: any) => {
        console.log("movememo")
        if (memo.panelID === droppableSource) {

            return Memos;
        } else {

            const newUpdatedMemo: IMemo = {
                ...memo,
                panelID: droppableDestination.droppableId,
            };
            dispatch(doUpdateMemo(newUpdatedMemo));

            return Memos;
        }
    };

    const onDragEnd = async (result: any) => {

        const { source, destination } = result;
        console.log(`Sourcce : ${JSON.stringify(source)} destination: ${JSON.stringify(destination)}`)
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {


            const reOrderedMemos: IMemo[] = reorder(
                Memos,
                result.source.index,
                result.destination.index,
                destination.droppableId
            );

            dispatch(setMemoState(reOrderedMemos));
            dispatch(reOrderMemos(Memos, destination.droppableId))
        } else {
            const memoToUpdate: IMemo[] = Memos.filter((m) => m.memoID === result.draggableId);
             moveMemo(memoToUpdate[0], source, destination);
            console.log("ELSE ELSE")
            //   console.log(result2)
            // dispatch(setMemoState(result2))

        }
        if (destination.index === source.index) {
            console.log("ELSE ELSE ELSE")
            return;
        }

    }

    const dSTART = () => { console.log("start") }
    const dUPDATE = (result: any) => { console.log(result) }
    //@ts-ignore

    const addPanel = async () => {
        dispatch(await addNewPanel(panelTitle))
    }

    return (
        <>
            <NavBar />
            <Header/>
            <Box width="100%" display="flex" marginBottom="10px" height="100vh" position="absolute" marginLeft="70px" backgroundColor="#181818">
                <DragDropContext
                    onDragEnd={onDragEnd}
                    onDragStart={dSTART}
                    onDragUpdate={dUPDATE}>
                    {Panels.map(p => {
                        return (
                            <MemoPanel key={p.panelID} panel={p} />
                        )
                    })}
                </DragDropContext>
                <Box >
                    <Popover>
                        <PopoverTrigger>
                            <IconButton aria-label="add new panel" icon="add" size="sm"  marginTop="10px" />
                        </PopoverTrigger>
                        <PopoverContent zIndex={4}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>Input new Panel header</PopoverBody>
                            <Input onChange={handlePanelTitleChange}></Input>'
                            <IconButton aria-label="add new panel" icon="add" size="xs"  marginTop="10px" onClick={addPanel}/>
                        </PopoverContent>
                    </Popover>

                </Box>
            </Box>

        </>

    );
};
