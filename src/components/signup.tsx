
import React, { useEffect } from 'react';
import { useState } from 'react'
// import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Form,  Button, Grid, Segment, Header,Message,Icon } from 'semantic-ui-react'

import {  doSignup } from '../state/thunks/loginThunk';
//const tabs = ["login", "google"]
import {  RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import ".././svg.css"
export const Signup: React.FC<RouteComponentProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setpasswordVerify] = useState('');
    const [formOK, setformOK] = useState(true);
    const dispatch = useDispatch();
    const signupError = useSelector((state: RootState) => state.loginState.signupError);

    useEffect(() => {
        if(passwordVerify===password && password.length > 3) {
            setformOK(false)
        } else {
            setformOK(true)
        }
      },[passwordVerify,password]);

    const handleSignup = async () => {

        dispatch(doSignup(username, password));

    }
    return (
        <div className="login-svg-bg">
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'  >
    <Grid.Column style={{ maxWidth: 450 }} >
      <Header as='h2' color='grey' textAlign='center'>
        <Icon name='unlock alternate' color='purple'/> Create account
      </Header>
      <Form size='large' onSubmit={ handleSignup }>
        <Segment stacked inverted={ true }>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' inverted={ true }  onChange={(e)=>setUsername(e.target.value)}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            inverted={ true }
            onChange={(e)=>setPassword(e.target.value)}
          />
           <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Verify password'
            type='password'
            inverted={ true }
            onChange={(e)=>setpasswordVerify(e.target.value)}
          />
          <Button color='grey' fluid size='large' disabled={ formOK }>
            Create new account
          </Button>
        </Segment>
      </Form>
      <Message color="grey">
        Already have an account?        
        <Link to="/login">
        <Button color='grey' size='small'>Login</Button>
          </Link>
        
      </Message>
      { signupError !== undefined &&       <Message
    error
    header='Login error!'
    list={ [signupError] }
    floating={ true }/>}

    </Grid.Column>
    
  </Grid>
        </div>

    );
}

