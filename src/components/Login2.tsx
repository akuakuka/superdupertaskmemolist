
import React from 'react';
import { useState } from 'react'
// import { createGlobalStyle, ThemeProvider } from "styled-components";
//import { Form,  Button, Grid, Segment, Header,Message,Icon } from 'semantic-ui-react'
import { FormControl, Box, Button, Grid, IconButton, Heading, Icon, Input } from '@chakra-ui/core';
import { doLogin } from '../state/thunks/loginThunk';
//const tabs = ["login", "google"]
import { Link, RouteComponentProps } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import ".././svg.css"
import { backendURL } from '../config/config';


export const Login2: React.FC<RouteComponentProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [loginError, setloginError] = useState(null);
    //@ts-ignore
    const handleUserNameChange = event => setUsername(event.target.value);
    //@ts-ignore
    const handlePasswordChange = event => setPassword(event.target.value);
    const dispatch = useDispatch();
    const loginError = useSelector((state: RootState) => state.loginState.loginError);
    const handleLogin = async () => {
        dispatch(doLogin(username, password));
    }
    const SocialhandleLogin = async (provider: string) => {
        //dispatch(doGoogleSigin());
        window.location.href = `${backendURL}/auth/${provider}`
    }
    return (
        <div className="login-svg-bg">
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'  >
                <Box maxWidth={450} >
                    <Heading as='h2' color='grey' textAlign='center'>
                        <Icon name='unlock' color='purple' /> Login
      </Heading>
                    <FormControl>
                        <Input onChange={handleUserNameChange} />
                        <Input onChange={handlePasswordChange} />
                        <Button>
            Login
          </Button>
                    </FormControl>


                </Box>
        <Box>
        <Heading color="grey">
       Social Login: <Icon name='google' color='red' size='large' className="socialIcon" as="i" onClick={() => SocialhandleLogin('google')}/> 
       <Icon name='github' color='grey' size='large' className="socialIcon" onClick={() => SocialhandleLogin('github')}/> 
       <Icon name='spotify' color='green' size='large' className="socialIcon" onClick={() => SocialhandleLogin('spotify')}/>
      </Heading>
        </Box>

            </Grid>
        </div>

    );

}

