
import React from 'react';
import { useState } from 'react'
// import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Form,  Button, Grid, Segment, Header,Message,Icon } from 'semantic-ui-react'

import { doLogin } from '../state/thunks/loginThunk';
//const tabs = ["login", "google"]
import { Link, RouteComponentProps } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import ".././svg.css"


export const Login: React.FC<RouteComponentProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [loginError, setloginError] = useState(null);

    const dispatch = useDispatch();
    const loginError = useSelector((state: RootState) => state.loginState.loginError);
    const handleLogin = async () => {
          dispatch(doLogin(username, password));
    }
    const SocialhandleLogin = async (provider:string) => {
      //dispatch(doGoogleSigin());
      window.location.href = `http://localhost:3000/auth/${provider}`
}
    return (
        <div className="login-svg-bg">
         <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'  >
    <Grid.Column style={{ maxWidth: 450 }} >
      <Header as='h2' color='grey' textAlign='center'>
        <Icon name='unlock alternate' color='purple'/> Login
      </Header>
      <Form size='large' onSubmit={ handleLogin }>
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
          <Button color='grey' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message color="grey">
       Social Login: <Icon name='google' color='red' size='large' className="socialIcon" as="i" onClick={() => SocialhandleLogin('google')}/> 
       <Icon name='github' color='grey' size='large' className="socialIcon" onClick={() => SocialhandleLogin('github')}/> 
       <Icon name='spotify' color='green' size='large' className="socialIcon" onClick={() => SocialhandleLogin('spotify')}/>
      </Message>
      <Link to="/signup">
      <Button color='red' fluid size='large'>
            create new account
          </Button>
          </Link>
      { loginError !== undefined &&     
      <Grid.Row verticalAlign="bottom">
      <Message
    error
    header='Login error!'
    list={ [loginError] }/>
    </Grid.Row>  }

    </Grid.Column>
    
  </Grid>
        </div>

    );

}

