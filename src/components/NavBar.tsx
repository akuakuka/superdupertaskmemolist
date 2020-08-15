import React from 'react';

import { Box, Icon, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

import { motion } from "framer-motion";

export const NavBar = () => {



    return (
        <Box width="5rem" height="100vh" position="fixed" backgroundColor="#202020" color="white">
            <Box listStyleType="none" display="flex" flexDirection="column" alignItems="center" paddingTop={50}>
                <motion.div whileHover={{ scale: 1.1 }}>


                    <Box marginLeft="auto" marginRight="auto" display="block" margin="10px">
                        <Link
                            to={{
                                pathname: "/main",
                            }}
                        >
                            <Icon name="edit" size="30px" color="#909090">

                            </Icon>
                            <Text color="#909090">
                                Memos
                    </Text>
                        </Link>
                    </Box>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Box marginLeft="auto" marginRight="auto" display="block" margin="10px">
                        <Link
                            to={{
                                pathname: "/mapview",
                            }}
                        >
                            <Icon name="calendar" size="30px" color="#909090">

                            </Icon>
                            <Text color="#909090">
                                Map
                    </Text>


                        </Link>
                    </Box>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Box marginLeft="auto" marginRight="auto" display="block" margin="10px" >
                        <Link
                            to={{
                                pathname: "/settings",
                            }}
                        >

                            <Icon name="settings" size="30px" color="#909090">

                            </Icon>
                            <Text color="#909090">
                                Settings
                    </Text>

                        </Link>
                    </Box>
                </motion.div>

            </Box>
        </Box>
    );
};
