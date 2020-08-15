import React, { useEffect } from 'react';

import { Callback } from "./components/Callback"

import { Signup } from "./components/signup"

//import "./App.css";
import {  Route  } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/rootReducer'

import { ThemeProvider,theme } from "@chakra-ui/core";
import 'semantic-ui-css/semantic.min.css'
import { MainView } from './components/MainView';
import { Login } from './components/login';
import { MapView } from './components/Map/MapView';
import { Settings } from './components/Settings';
import { getUser } from './state/thunks/loginThunk';
import { LoginChakra } from './components/LoginChakra';


//import theme from '@rebass/preset'

const App = () => {
 // const loggedIn = useSelector((state: RootState) => state.loginState.loggedIn);
  const loginState = useSelector((state: RootState) => state.loginState.loggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getUser());
  }, [dispatch]);
// <Login />

// <CSSReset />
  return (
  <ThemeProvider theme={theme}>
    <Route exact path={"/"} component={LoginChakra} />
    <Route exact path={"/callback"} component={Callback} />
    <Route exact path={"/login"} component={LoginChakra} />
    <Route exact path={"/signup"} component={Signup} />
    <Route exact path={"/mai"} component={MainView} />
    <PrivateRoute exact path={"/main"} component={MainView} loginState={loginState}/>
    <PrivateRoute exact path={"/mapview"} component={MapView} loginState={loginState}/>
    <PrivateRoute exact path={"/settings"} component={Settings} loginState={loginState}/>

    
  </ThemeProvider>
  
//         {loggedIn === LOGIN_STATUS.CHECKING_LOGIN_STATUS && <h1>Loading...</h1>}
//         {loggedIn === LOGIN_STATUS.LOGGED_OUT &&
//     <>
//             <Route exact path={"/login"} component={Login} />
//             <Route exact path={"/signup"} component={Signup} />
// </>
//         }
//         {loggedIn === LOGIN_STATUS.LOGGED_IN && <PrivateRoute LoginStatus={loggedIn} component={MemoView} />}


    
  
  );
}
//<MainView></MainView>
export default App;
