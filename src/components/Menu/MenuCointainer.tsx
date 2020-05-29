import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {MenuItem} from "./MenuItem"
import { Grid, Segment, Icon  } from 'semantic-ui-react';
import styled from "styled-components/macro";
export const MenuContainer = () => {


  const dispatch = useDispatch();
  const Menu = styled.div`
grid-area: 1 / 1 / 5 / 2;
height: 100vh;
background:#060818

`

  useEffect(() => {
    console.log("menui")
  }, [dispatch]);

  

//189 x 47
  return (

<Menu>
<div>asd</div>
</Menu>

  )

}
//<MemoListPanel/>















