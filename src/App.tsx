import React from 'react'
import './App.css'

import Container from './components/Container'
import Grid from './components/Grid'
import ObjectLayer from './components/ObjectLayer'
import Gizmo from './components/Gizmo'
import Board from './components/Board'
import styled from 'styled-components'

import TimelineIcon from '@material-ui/icons/Timeline';


function App() {
  console.log('App')
  const handleClick = ()=>{
    console.log('click')
  }
  return (
    <>
    <Container height={'100%'} width={'100%'}>
      <Grid />
      <Board />
{/*       
      <Gizmo />
      <ObjectLayer /> */}

      
    </Container>
    <TOOLBAR>
      <button onClick={handleClick}>
      <TimelineIcon />
      </button>
      </TOOLBAR>
    </>

  );
}

export default App


const TOOLBAR = styled.div`
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;

 border: 3px solid red;

 height: 50px;

`