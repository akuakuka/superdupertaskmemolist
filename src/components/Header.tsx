import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, Text, Button, Divider, Input, Avatar } from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import {setFilter} from "../state/slices/filterSlice"

const MenuItems = () => (
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        MENUITEM
  </Text>
);
// <Divider borderColor="red.200" />
export const Header = () => {
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  dispatch(setFilter(value));
   
    return (
        <>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1.5rem"
                bg="#202020"
                color="white"

            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" paddingLeft="70px" paddingRight="70px">
                        superdupertaskmemolist
        </Heading>
                    <Input
                        value={value}
                        onChange={handleChange}
                        placeholder="filter memos"
                        size="lg"
                    />
                    <Box
                        display={{ sm: show ? "block" : "none", md: "block" }}
                        mt={{ base: 4, md: 0 }}
                    >
                        <Avatar name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" />
                    </Box>


                </Flex>

            </Flex>

        </>
    );
};

export default Header;