import React from 'react';
import IMemo from '../../models/Memo';
import { Flex, Box, Text, Badge, IconButton } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMemo } from '../../state/thunks/memoThunk';
//ass

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

    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="teal">
            New
    </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.Memo.title}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {content}
        </Box>

        <Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            reviews
    </Box>
        </Box>
      </Box>
    </Box>
  )
};















