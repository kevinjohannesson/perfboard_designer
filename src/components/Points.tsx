import React, { ReactElement, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { get__grid, get__view } from '../redux/reducers/board/selectors'
import { copperPadDiameter } from './CONSTANTS'
import styled from 'styled-components'

export default function Points(): ReactElement {
  const view = useSelector(get__view)
  const grid = useSelector(get__grid)

  const handleClick = useCallback((pt)=>{
    console.log(pt)
  }, [])
  
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
              
              onClick = { ()=>handleClick(pt) }
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
