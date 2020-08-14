import React, { ReactElement, useRef, useEffect, useReducer } from 'react'

import styled from 'styled-components'

interface Props {
  children: React.ReactNode;
  height: number | string;
  width: number | string;
}

export interface I_Vector {
  x: number;
  y: number;
}

interface I_State {
  height: number;
  width: number;
  gizmoLocation: I_Vector | null;
}

const initialState: I_State = {
  height: 0,
  width: 0,
  gizmoLocation: null,
};

export const Context = React.createContext(initialState)

function reducer(state: I_State, action: any): I_State {
  switch (action.type) {
    case 'SET_HEIGHT':
      return {...state, height: action.height}
    case 'SET_WIDTH':
      return {...state, width: action.width}
    case 'UPDATE_DIMENSIONS':
      return {...state, height: action.height, width: action.width}
    default:
      throw new Error()
  }
}

export default function Container({height, width, children}: Props): ReactElement {

  const ref = useRef<HTMLDivElement>(null)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    if (ref.current) {
      const renderedElement = {
        height: ref.current.clientHeight,
        width: ref.current.clientWidth
      }

      if( renderedElement.height !== state.height || 
          renderedElement.width !== state.width ) {
            dispatch(
              { type: 'UPDATE_DIMENSIONS', 
                height: renderedElement.height, 
                width: renderedElement.width
              })
      }

  }
  }, [state.height, state.width])

  const scrollHandler = (e: any)=> {
    console.log(e.deltaY)
    console.log('hallo')}

    const touchEnd = () => {console.log('end')}
  return (
    <CONTAINER ref={ref} h={height} w={width} onTouchEnd={touchEnd} onClick={scrollHandler} onScroll={scrollHandler} onWheel={scrollHandler} >
      <Context.Provider value={state}>
        {children}
      </Context.Provider>
    </CONTAINER>
  )
}

const CONTAINER = styled.div<{h: number | string, w: number | string}>`
  height: ${props => typeof props.h === 'string' ? props.h : `${props.h}px`};
  width: ${props => typeof props.w === 'string' ? props.w : `${props.w}px`};

  display: flex;
  justify-content: center;
  align-items: center;
`
