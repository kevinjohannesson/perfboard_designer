import React, { ReactElement } from 'react'
import { I_Vector } from './Container'

import { useSelector } from 'react-redux'

import { get__wireColor } from '../redux/reducers/board/selectors'
import { wireColorName } from './CONSTANTS'

interface Props {
  start: I_Vector,
  end: I_Vector,
  color: wireColorName
}



export default function Connection({start, end, color}: Props): ReactElement {

  

  const handleClick = ()=>{
    console.log('-Connection:')
    console.log(' start: ', start)
    console.log(' end: ', end)
    console.log(' color: ', color)
  }
  return (
    <line
      x1={start.x} 
      y1={start.y} 
      x2={end.x}
      y2={end.y}
      style={{ 
        stroke: color, 
        strokeWidth:1,
      }}

      strokeLinecap="round"

      onClick = {handleClick}
    />
  )
}
