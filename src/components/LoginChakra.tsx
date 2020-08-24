
import React, { useEffect } from 'react';
import { useState } from 'react'
// import { createGlobalStyle, ThemeProvider } from "styled-components";


import { doLogin, doSignup } from '../state/thunks/loginThunk';
//const tabs = ["login", "google"]
import { Link, RouteComponentProps } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import ".././svg.css"
import ".././App.css"
import { backendURL } from '../config/config';
import { Box, Input, Stack, Icon, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/core';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faSpotify,faGithub } from '@fortawesome/free-brands-svg-icons'

export const LoginChakra: React.FC<RouteComponentProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setnewEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newPasswordVerify, setnewPasswordVerify] = useState('');
    const [newPasswordOK, setnewPasswordOK] = useState(true);
    //const [loginError, setloginError] = useState(null);
    const handleNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => setnewEmail(event.target.value);
    const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => setnewPassword(event.target.value);
    const handleNewPasswordVerify = (event: React.ChangeEvent<HTMLInputElement>) => setnewPasswordVerify(event.target.value);
    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const checkPassword = () => {
        if (newPassword === '' && newPasswordVerify === '') {
            return;
        }
        if (newPasswordVerify === newPassword) {
            setnewPasswordOK(true)
        } else {
            setnewPasswordOK(false)
        }
    }

    useEffect(() => {
        checkPassword()
    })

    const dispatch = useDispatch();
    const loginError = useSelector((state: RootState) => state.loginState.loginError);
    const handleLogin = async () => {
        console.log(username)
        dispatch(doLogin(username, password));

    }

    const handleSignup = async () => {

        dispatch(doSignup(newEmail, newPassword));

    }
    const SocialhandleLogin = async (provider: string) => {
        //dispatch(doGoogleSigin());
        window.location.href = `${backendURL}/auth/${provider}`
    }
    return (
        <div className="loginbg">
            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 1.5 }}
                whileHover={{ scale:0.7}}
            >
                <Box left="50%" position="fixed" transform="translate(-50%, -50%)" paddingTop="800px">
                    <Text fontSize="6xl" color="white"> superdupertaskmemolist</Text>
                </Box>
            </motion.div>
            <Box top="50%" left="50%" position="fixed" transform="translate(-50%, -50%)" backgroundColor="grey">
                <Tabs isFitted variant="enclosed">
                    <TabList mb="1em">
                        <Tab>Login</Tab>
                        <Tab>Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box minWidth="sm" maxWidth="sm" borderWidth="1px" rounded="lg" overflow="hidden">
                                <Stack spacing={3}>

                                    <Input placeholder="email" size="md" onChange={handleUsername} />
                                    <Input placeholder="password" size="md" type="password" onChange={handlePassword} />
                                    <Button variantColor="green" onClick={handleLogin}>Login</Button>
                                    <Box bg="tomato" w="100%" p={4} color="white">

                                        <Flex align="center" justify="center" justifyContent="space-around">
                                            <motion.div whileHover={{ scale: 1.7 }}>
                                            <FontAwesomeIcon size="lg" icon={faGoogle} onClick={() => SocialhandleLogin('google')}/>

                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.7 }}>
                                            <FontAwesomeIcon size="lg" icon={faSpotify} onClick={() => SocialhandleLogin('spotify')}/>

                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.7 }}>
                                            <FontAwesomeIcon size="lg" icon={faGithub} onClick={() => SocialhandleLogin('github')}/>

                                            </motion.div>

                                        </Flex>
                                    </Box>
                                </Stack>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box minWidth="sm" maxWidth="sm" borderWidth="1px" rounded="lg" overflow="hidden" backgroundColor="grey" >
                                <Stack spacing={3}>

                                    <Input placeholder="email" size="md" onChange={handleNewEmail} />
                                    <Input placeholder="password" size="md" type="password" onChange={handleNewPassword} isInvalid={!newPasswordOK} errorBorderColor="crimson" />
                                    <Input placeholder="verify password" size="md" type="password" onChange={handleNewPasswordVerify} isInvalid={!newPasswordOK} errorBorderColor="crimson" />
                                    <Button variantColor="blue" onClick={handleSignup}>Signup</Button>
                                    <Box bg="tomato" w="100%" p={4} color="white">
                                        <Flex align="center" justify="center" justifyContent="space-around">
                                            <motion.div whileHover={{ scale: 1.7 }}>
                                            <FontAwesomeIcon size="lg" icon={faGoogle} onClick={() => SocialhandleLogin('google')}/>

                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.7 }}>
                                            <FontAwesomeIcon size="lg" icon={faSpotify} onClick={() => SocialhandleLogin('spotify')}/>

                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.7 }}>
                                            <FontAwesomeIcon size="lg" icon={faGithub} onClick={() => SocialhandleLogin('github')}/>

                                            </motion.div>

                                        </Flex>
                                    </Box>
                                </Stack>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>


            </Box>
        </div>

    );

}

