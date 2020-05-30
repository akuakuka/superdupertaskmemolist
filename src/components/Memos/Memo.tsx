import React from 'react';
import IMemo from '../../models/Memo';
import {  Flex, Box, Text, Badge } from '@chakra-ui/core';


interface IMemoProps {
    Memo: IMemo;
}

export const Memo = (props: IMemoProps) => {
    const { content } = props.Memo;
  //  const dispatch = useDispatch();
    // const handleDelete = async () => {
    //     await dispatch(deleteMemo(props.Memo))
    // }
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
            </Box>
        </Flex>
    )
};

