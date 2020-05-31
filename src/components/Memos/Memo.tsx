import React from 'react';
import IMemo from '../../models/Memo';
import { Flex, Box, Text, Badge, IconButton } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMemo } from '../../state/thunks/memoThunk';


interface IMemoProps {
    Memo: IMemo;
}

export const Memo = (props: IMemoProps) => {
    const dateNow = new Date()
    const memoDate = new Date(props.Memo.createdDate)
    const age = dateNow.getTime() - memoDate.getTime()
    let isNew = false;
    //  259200000
      //  1625569
    if (age < 25920000) {
        isNew = true;
    }
    console.log(age)
    console.log(isNew)
    const { content } = props.Memo;
    const dispatch = useDispatch();
    const handleDelete = async () => {
        await dispatch(deleteMemo(props.Memo))
    }
    return (
        <Flex>
            <Box
                borderRadius="2px"
                border="2px"
                backgroundColor="gray.600"
                boxShadow="none"
                boxSizing="border-box"
                padding="9px"
                minHeight="60px"
                marginBottom="8px"
                color="red"
                width="230px"
                display="flex"
            >
                {isNew ? <Badge variantColor="green">
                    New
                    </Badge> : <></>
                }


                <Text fontSize="sm">{content}</Text>
                <IconButton size="xs" aria-label="delete" icon="close" onClick={handleDelete} />
            </Box>
        </Flex>
    )
};

