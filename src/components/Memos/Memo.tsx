import React from 'react';
import IMemo from '../../models/Memo';
import { Flex, Box, Text, Badge, IconButton } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMemo } from '../../state/thunks/memoThunk';
import { initMemos } from '../../state/slices/memoSlice';


interface IMemoProps {
    Memo: IMemo;
}

export const Memo = (props: IMemoProps) => {
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

                <Badge variantColor="green">
                    New
                    </Badge>

                <Text fontSize="sm">{content}</Text>
                <IconButton size="xs" aria-label="delete" icon="close" onClick={handleDelete} />
            </Box>
        </Flex>
    )
};

