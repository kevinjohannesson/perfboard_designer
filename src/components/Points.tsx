import React, { ReactElement, useCallback, useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get__grid, get__view, get__tool, get__newHeader } from '../redux/reducers/board/selectors'
import { copperPadDiameter } from './CONSTANTS'
import styled from 'styled-components'
import { draw__headerInit, set__headerWidth, set__headerHeight, draw__headerFinish, add__connection } from '../redux/reducers/board/actions'
import { Point, Vector } from './Board.d'
import { getScale, getZoom } from '../redux/reducers/app/selectors'

export default function Points(): ReactElement {
  console.log('Points()')
  const view = useSelector(get__view)
  const grid = useSelector(get__grid)

  const scale = useSelector(getScale)
  const zoom = useSelector(getZoom)
  
  const tool = useSelector(get__tool)

  const header = useSelector(get__newHeader)
  const headerRef = useRef(header)
  headerRef.current = header


  const ptnumRef = useRef<number | null>(header ? header.ptnum : null)
  ptnumRef.current = header.ptnum

  const dispatch = useDispatch()

  

  const [origin, set_origin] = useState<Vector>()
  
  const handleMouseMove = useCallback((event: MouseEvent) => {
    console.log('mousemove')
    if(origin && origin.x && origin.y){

      const currentMousePosition = {
        x: event.clientX,
        y: event.clientY
      }
      const mouseDifference = {
        x: Math.abs(currentMousePosition.x - origin.x),
        y: Math.abs(currentMousePosition.y - origin.y)
      }
      const pitchInPixels = (grid.pitch * zoom * scale)
      
      const heightInPitch = Math.ceil((mouseDifference.y / pitchInPixels) + 0.5) * (currentMousePosition.y < origin.y ? -1 : 1)
      const widthInPitch = Math.ceil((mouseDifference.x / pitchInPixels) + 0.5) * (currentMousePosition.x < origin.x ? -1 : 1)

      const h = (Math.abs(heightInPitch) <= Math.abs(widthInPitch) && Math.abs(heightInPitch) > 2) ? 
        (heightInPitch < 0 ? -2 : 2) : 
        heightInPitch
      const w = (Math.abs(widthInPitch) < Math.abs(heightInPitch) && Math.abs(widthInPitch) > 2) ? 
        (widthInPitch < 0 ? -2 : 2) : 
        widthInPitch

      if(w !== headerRef.current.width){
        headerRef.current.width = w
        dispatch(set__headerWidth(w))
      } 
      
      if(h !== headerRef.current.height){
        headerRef.current.height = h
        dispatch(set__headerHeight(h))
      }
    }

  }, [dispatch, grid.pitch, origin, scale, zoom])

  
  useEffect(() => {
    if(header.ptnum){
      document.addEventListener('mousemove', handleMouseMove)
    }
    return ()=>{
      document.removeEventListener('mousemove', handleMouseMove)
    }
    
  }, [header.ptnum, handleMouseMove])



  const handleClick = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>, pt: Point)=>{
    console.log('click')
    const bound = event.currentTarget.getBoundingClientRect()
    const origin = { 
      x: bound.x + bound.width / 2,
      y: bound.y + bound.height / 2
    }
    // console.log(o => )
    // set_origin(origin)
    switch(tool){
      case 'connection': {
        dispatch(add__connection(pt.ptnum))
        break;
      }
      case 'header': {
        if(!header.ptnum) {
          // headerRef.current = newHeader
          console.log('draw header')
          set_origin(origin)
          dispatch(draw__headerInit(pt.ptnum))
          
        }
        if(header.ptnum) {
          document.removeEventListener('mousemove', handleMouseMove)
          dispatch(draw__headerFinish())
          console.log('hallo')
        }
        
        break;
      }
      default: {
        break;
      }
    }
  }, [dispatch, header.ptnum, tool, handleMouseMove])

  
  
  return (
    <>
      {
        Object.values(grid.points).map((pt, i) => {
          const {x, y} = pt.location[view]
          return (
            <POINT 
              key = {i}
              cx = {x}
              cy = {y}
              r = {copperPadDiameter / 2}
              
              onClick = { (e)=>handleClick(e, pt) }
            />
          )
        })
      }
  </>
  )
}

  


//   const handleClick = useCallback((pt)=>{
//     console.log(pt)
//   }, [])
//   return (
//     <>
//       {
//         grid && grid.points.map((pt, i) => 
//           <POINT 
//             key = { i }
//             cx = { pt.x }
//             cy = { pt.y }
//             r={ copperPadDiameter / 2 }
            
            
//             onClick = { ()=>handleClick(pt) }

            
//           />
//         )
//       }
//     </>
//   )
// }

const POINT = styled.circle`
  fill: rgba(0,0,0,0);
  stroke: rgba(0,0,0,0);
  
  stroke-width: 0.3;

  &:hover {
    stroke: rgba(255,255,255,0.85);
  }
  &:active {
    fill: rgba(255,255,255,0.4);
  }

  transition: all 0.1s ease;
`
