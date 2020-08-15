import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Editable, EditableInput, EditablePreview } from '@chakra-ui/core';
import { addNewMemo } from '../../state/thunks/memoThunk';


export const AddNewMemo = () => {
    const defaultValue = "Add New Memo"
    const [newMemoValue, setNewMemoValue] = useState(defaultValue)
    const dispatch = useDispatch();


const handlesubmit = (e:string) => {
    if(newMemoValue !== defaultValue) {
        console.log("eriswuuri")
        dispatch(addNewMemo(newMemoValue," "));
        setNewMemoValue(defaultValue)
    }

}
const handleChange = (e:string) => {
    console.log(e)
  setNewMemoValue(e)

}
    return (
        <Box color="white">
        <Editable value={newMemoValue} defaultValue={defaultValue} onChange={handleChange} onSubmit={handlesubmit} backgroundColor="cyan.900">
            <EditablePreview />
            <EditableInput />
        </Editable>
        </Box>
    );
};
