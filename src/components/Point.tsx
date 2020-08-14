import React, { ReactElement, useCallback, useContext, useState } from 'react'
import styled from 'styled-components'

import { Context } from './Container'
import { useDispatch } from 'react-redux'
import { setGizmoLocation } from '../redux/reducers/app/actions';

interface Props {
  x: number;
  y: number;
}

export interface I_Point {
  x: number;
  y: number;
}

export default function Point({x, y}: Props): ReactElement {
  const dispatch = useDispatch();
  const context = useContext(Context)
  console.log(context)

  const [selected, set_selected] = useState(false)


  const clickHandler = useCallback(
    () => {
      console.log('point')
      set_selected(true);
      dispatch(setGizmoLocation({x, y}))
    },
    [dispatch, x, y],
  )

  return (
    <div onClick={clickHandler}>
    <Pt top={y - 10} left={x - 10} width="20" height="20" viewBox="0 0 20 20" >
      <circle cx={10} cy={10} r={10} />
    </Pt>
    </div>  
  )
}

const Pt = styled.svg<{ top: number, left: number }>`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;

  fill: orange;

  &:hover {
    fill: maroon;
  }
`
