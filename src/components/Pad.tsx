import React, { ReactElement } from 'react'

import styled from 'styled-components'
import { I_Vector } from './Container'

import {copperPadDiameter, holeDiameter} from './CONSTANTS'
import { useDispatch, useSelector } from 'react-redux'
import { get__tool, get__current_ptnum } from '../redux/reducers/board/selectors'
import { set__current_ptnum, add__connection } from '../redux/reducers/board/actions'
import { set__contextMenuLocation } from '../redux/reducers/app/actions'
interface Props {
  location: I_Vector,
  ptnum: number
}

export default function Pad({location, ptnum}: Props): ReactElement {
  const dispatch = useDispatch()
  const tool = useSelector(get__tool)
  const current_ptnum = useSelector(get__current_ptnum)

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('right click')
    console.log(e.clientX)
    console.log(e.clientY)

    dispatch(set__contextMenuLocation({x: e.clientX, y: e.clientY}))

  }
  
  const handleClick = (ptnum: number) => {
    dispatch(set__contextMenuLocation(null))

    switch(tool){
      case 'connection': {
        console.log('-Adding a connectionPoint:')
        dispatch( add__connection(ptnum) )
        // console.log(e.currentTarget.getAttribute('data-ptnum'))
        // const ptnum_attr = e.currentTarget.getAttribute('data-ptnum')
        // console.log(pt_num: ptnum_attr)
        // if(ptnum_attr !== null){
          // const ptnum = parseInt(ptnum_attr)

          // if(current_ptnum !== null){
          //   console.log('hallo')
          // }
          // // // set_connections( [...connections, componentHoles[parseInt(ptnum)]])
          // // // connections.push( componentHoles[parseInt(ptnum)])
          // // // console.log(connections)
          // dispatch( set__current_ptnum(ptnum) )
          
        
        break;
      }
      case 'header': {
        // const ptnum = e.currentTarget.getAttribute('data-ptnum')
        // if(ptnum !== null){
        //   dispatch( create__header( parseInt(ptnum) ) )
        // }
        break;
      }
      default: {
        console.log('click')
        console.log('ptnum: ', ptnum)
      }
    }
  }

  return (
    <PAD 
      cx = { location.x }
      cy = { location.y }
      r={ copperPadDiameter / 2 }
      strokeWidth={(copperPadDiameter - holeDiameter) }

      onClick={ () => handleClick(ptnum)}

      onContextMenu = { handleRightClick }

      // data-ptnum = { ptnum }
    />
  )
}

const PAD = styled.circle`
  fill: rgba(0,0,0,0);
  stroke: #e3aa80;

  clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
  
  &:hover {
    stroke: gold;
  }
`