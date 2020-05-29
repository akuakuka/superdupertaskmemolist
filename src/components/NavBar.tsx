import React from 'react';

import { Box, Icon } from '@chakra-ui/core';
import { Link } from 'react-router-dom';


export const NavBar = () => {



    return (
        <Box width="5rem" height="100vh" position="fixed" backgroundColor="gray.500">
            <Box listStyleType="none" padding={0} margin={0} display="flex" flexDirection="column" alignItems="center">
                <Icon name="warning" size="32px" color="red.500" />
                <Icon name="edit" size="32px" color="red.500" />
                <Icon name="attachment" size="32px" color="red.500" />



                <Link
                    to={{
                        pathname: "/mapview",
                    }}
                >Map</Link>

            </Box>
        </Box>
    );
};
