import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';


//import theme from '@rebass/preset'
const Menu = styled.div`
grid-row-start:2;
grid-row-end:-1;
grid-column-start:1;
grid-column-end:1;
background: blue;
border-right: 4px dotted blue;
border-right-color: green; 
`;

export const Menuu: React.FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    //  dispatch(checkLogin());
  }, [dispatch]);
// <Login />

  return (

 <Menu>
     MENUU
 </Menu>
  );
}

