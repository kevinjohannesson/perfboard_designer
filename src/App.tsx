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
import { useDispatch, useSelector } from 'react-redux'
import { set__tool, set__current_ptnum, set__wireColor, set__view } from './redux/reducers/board/actions'
import ContextMenu from './components/ContextMenu'

import {wireColors} from './components/CONSTANTS'
import { get__view } from './redux/reducers/board/selectors'


function App() {
  const dispatch = useDispatch()
  const view = useSelector(get__view)
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


  const toggleView = () => {
    console.log('Toggling view')
    dispatch(set__view(view === 'front' ? 'back' : 'front'))
  }

  
  


  return (
    <>
    <Container height={'100%'} width={'100%'}>
      <Grid />
      <ContextMenu />
      <Board height={50} width={70} rows={18} columns={24} pitch={2.54} layer={'single'}/>
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
      <WRAPPER>
        
        <SIDE_TOGGLE onClick={toggleView}><span>{view === 'front' ? 'Front-' : 'Back-'}View</span></SIDE_TOGGLE>
      </WRAPPER>
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
 
 const WRAPPER = styled.div`
 height: 100%;
 width: 100%;
 
 position: fixed;
 top: 0;
 left: 0;
 
 color: white;
 
 display: flex;
 justify-content: center;
 align-items: flex-start;
 
 // border: 3px solid red;
 z-index: 9;
 
 pointer-events: none;
 `
 
 const SIDE_TOGGLE = styled.button`
 font-size: 18px;
 pointer-events: auto;
  &:hover {
    span {
      display: none;
    }
  }
  &:hover:before {content:"Toggle"}
  
 `