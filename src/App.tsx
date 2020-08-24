import React, { useEffect } from 'react';
import { Callback } from "./components/Callback"
import {  Route  } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/rootReducer'
import { ThemeProvider,theme } from "@chakra-ui/core";
import { MainView } from './components/MainView';
import { Pictures } from './components/Pictures';
import { MapView } from './components/Map/MapView';
import { Settings } from './components/Settings';
import { getUser } from './state/thunks/loginThunk';
import { Login } from './components/Login';

const App = () => {
  const loginState = useSelector((state: RootState) => state.loginState.loggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getUser());
  }, [dispatch]);

  return (
  <ThemeProvider theme={theme}>
    <Route exact path={"/"} component={Login} />
    <Route exact path={"/callback"} component={Callback} />
    <Route exact path={"/login"} component={Login} />
    <PrivateRoute exact path={"/main"} component={MainView} loginState={loginState}/>
    <PrivateRoute exact path={"/mapview"} component={MapView} loginState={loginState}/>
    <PrivateRoute exact path={"/settings"} component={Settings} loginState={loginState}/>
    <PrivateRoute exact path={"/pictures"} component={Pictures} loginState={loginState}/>
    
  </ThemeProvider>

  );
}

export default App;
