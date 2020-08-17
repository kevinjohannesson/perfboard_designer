import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { get__contextMenuLocation } from '../redux/reducers/app/selectors'



export default function ContextMenu(): ReactElement {
  const location = useSelector(get__contextMenuLocation)
  console.log(location)
  return (
    <>
      { location && 
          <CONTEXT_MENU 
            top = { location.y } 
            left = { location.x } 
          >
              hallo
          </CONTEXT_MENU>
      }
    </>
  )
}

const CONTEXT_MENU = styled.div<{top: number, left: number}>`
  display: inline-block;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  height: 200px;
  width: 200px;
  background-color: green;

  z-index: 999;
`