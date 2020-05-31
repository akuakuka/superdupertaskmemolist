import React from 'react';

import { Box } from '@chakra-ui/core';
import { Link } from 'react-router-dom';


export const NavBar = () => {



    return (
        <Box width="5rem" height="100vh" position="fixed" backgroundColor="purple.900">
            <Box listStyleType="none" padding={0} margin={0} display="flex" flexDirection="column" alignItems="center">
                <Link
                    to={{
                        pathname: "/main",
                    }}
                >Main</Link>

                <Link
                    to={{
                        pathname: "/mapview",
                    }}
                >Map</Link>

                <Link
                    to={{
                        pathname: "/settings",
                    }}
                >Settings</Link>


            </Box>
        </Box>
    );
};
