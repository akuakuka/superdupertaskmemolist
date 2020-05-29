import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMemo } from '../state/thunks/memoThunk';
import { NavBar } from './NavBar';
import { MemoPanel } from './MemoPanel';
import { Box, Input, Stack, Button } from '@chakra-ui/core';
import { RootState } from '../state/rootReducer';
import { DragDropContext } from 'react-beautiful-dnd';
import IMemo from '../models/Memo';
import { setMemoState, updateMemo } from '../state/slices/memoSlice';
import { getPanels, addNewPanel } from '../state/thunks/panelThunk';
import { getVerifyCode } from '../state/thunks/pluginThunk';


export const MainView = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const Panels = useSelector((state: RootState) => state.panelState.panels);
    const Memos = useSelector((state: RootState) => state.memoState.memos);
    const dispatch = useDispatch();

    useEffect(() => {
       // dispatch(getMemos())
        dispatch(getPanels())
        
    },[dispatch])

    const reorder = (list: any, startIndex: number, endIndex: number): IMemo[] => {
        const result: IMemo[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const moveMemo = (memo: IMemo, droppableSource: any, droppableDestination: any) => {
        console.log(memo.panelID)
        if (memo.panelID === droppableSource) {
            console.log('sama');
            console.log(droppableDestination)
            return Memos;
        } else {
            console.log('ei sasama');
            console.log(droppableDestination);
            const newUpdatedMemo: IMemo = {
             ...memo,
             panelID: droppableDestination.droppableId,
             };
            dispatch(updateMemo(newUpdatedMemo));
   
            return Memos;
        }
    };

    const onDragEnd = async (result: any) => {
        const { source, destination } = result;
        console.log(result)
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const reOrderedMemos: IMemo[] = reorder(
                Memos,
                result.source.index,
                result.destination.index,
            );
            console.log("ReORdering")
            dispatch(await setMemoState(reOrderedMemos));
        } else {
            const memoToUpdate: IMemo[] = Memos.filter((m) => m.memoID === result.draggableId);
            const result2 = moveMemo(memoToUpdate[0], source, destination);
            console.log('else move');
            console.log(result2)
             // dispatch(setMemoState(result2))

        }
        if (destination.index === source.index) {
            return;
        }

    }

    const dSTART = () => { console.log("start") }
    const dUPDATE = () => { console.log("update") }
    //@ts-ignore
    const handleChange = (event) => setTitle(event.target.value);
    //@ts-ignore
    const handleContentChange = (event) => setContent(event.target.value);
    const onMemoSubmit = async () => {
        console.log("submitting")
        dispatch(await addNewMemo(content, title))
    }
    const addPanel = async () => {
        dispatch(await addNewPanel("bnewPanel"))
    }
    const getCode = async () => {
        dispatch(await getVerifyCode("telegram"))
    }
    return (
        <>
            <NavBar />
            <Box width="100%" display="flex" marginBottom="10px" height="100vh" position="absolute" marginLeft="70px" backgroundColor="gray.800">
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
                <Button onClick={addPanel}>addnewpanel!</Button>
                <Stack spacing={3}>
                    <Input placeholder="Title" size="lg" onChange={handleChange} />
                    <Input placeholder="Content" size="sm" onChange={handleContentChange} />
                    <Button onClick={onMemoSubmit}>SaveMemo!</Button>
                </Stack>
                <Button onClick={getCode}>getCode!</Button>
            </Box>

        </>

    );
};
