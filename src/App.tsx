import React from 'react'
import './App.css'

import Container from './components/Container'
import Grid from './components/Grid'
// import ObjectLayer from './components/ObjectLayer'
// import Gizmo from './components/Gizmo'
import Board from './components/Board'
import styled from 'styled-components'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import TimelineIcon from '@material-ui/icons/Timeline';
import { useDispatch } from 'react-redux'
import { set__tool, set__current_ptnum, set__wireColor } from './redux/reducers/board/actions'
import ContextMenu from './components/ContextMenu'

import {wireColors} from './components/CONSTANTS'


function App() {
  const dispatch = useDispatch()
  // console.log('App')
  const handleClick = ()=>{
    console.log('click')
    dispatch( set__tool('connection'))

    const exitTool = (e: KeyboardEvent) => {
      if(e.key === 'Esc' || e.key === 'Escape') {
        console.log('Exiting tool')
        dispatch( set__tool(null) )
        dispatch( set__current_ptnum(null) )
        document.removeEventListener('keydown', exitTool)
      }
    }
    document.addEventListener('keydown', exitTool)
  }
  const createHeaders = ()=>{
    console.log('headers')
    dispatch( set__tool('header'))

    const exitTool = (e: KeyboardEvent) => {
      if(e.key === 'Esc' || e.key === 'Escape') {
        console.log('Exiting tool')
        dispatch( set__tool(null) )
        dispatch( set__current_ptnum(null) )
        document.removeEventListener('keydown', exitTool)
      }
    }
    document.addEventListener('keydown', exitTool)
  }


  
  


  return (
    <>
    <Container height={'100%'} width={'100%'}>
      <Grid />
      <ContextMenu />
      <Board />
{/*       
      <Gizmo />
      <ObjectLayer /> */}

      
    </Container>
    <TOOLBAR>
      <button onClick={handleClick}>
      <TimelineIcon />
      </button>
      <button onClick={createHeaders}>
      <CheckBoxOutlineBlankIcon />
      </button>
      {
        Object.keys(wireColors).map((color, i) =>
        <WIRE_COLOR_SWATCH key = { i } color={color} onClick={()=>dispatch(set__wireColor(color))}></WIRE_COLOR_SWATCH> )
      }
      </TOOLBAR>
    </>

  );
}

export default App


const WIRE_COLOR_SWATCH = styled.div<{color: string}>`
  display: inline-block;
  background-color: ${props => props.color};
  color: ${props => props.color};

  min-width: 30px;
  min-height: 30px;

`
const TOOLBAR = styled.div`
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;

 border: 3px solid red;

 height: 50px;

`