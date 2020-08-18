import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { get__board } from '../redux/reducers/board/selectors'


export default function Paper(): ReactElement {
  
  const board = useSelector(get__board)
  
  const maskID = 'maskID'

  return (
    <>
      <mask id={maskID}>
        {/* Unmasked base: */}
        <rect x="0" y="0" width="100%" height="100%" fill="white"/>
        {/* Drilled component holes */}
        {
          Object.values(board.grid.points).map( (pt, i) => 
            <circle
              key = { i }
              cx = { board.grid.offset.left + pt.location.front.x }
              cy = { board.grid.offset.top + pt.location.back.y }
              r = { (board.grid.pitch === 2.54 ? 1.2 : 0.6) / 2 }
            />
          )
        }
      </mask>

      {/* Paper board base: */}
      <rect 
        x="0" 
        y="0" 
        width="100%" 
        height="100%" 
        fill="#ae7754" 
        mask={`url(#${maskID})`} 
      />
    </>
  )
}




// {/* Drilled mounting holes: */}
//         {/* { mountingHoles && width && height &&
//           <>
//             <circle 
//               cx={mountingHoles.offset} 
//               cy={mountingHoles.offset} 
//               r={mountingHoles.radius} 
//             /> 
//             <circle 
//               cx={width - mountingHoles.offset} 
//               cy={mountingHoles.offset} 
//               r={mountingHoles.radius}
//             />
//             <circle 
//               cx={mountingHoles.offset} 
//               cy={height - mountingHoles.offset} 
//               r={mountingHoles.radius} 
//             />
//             <circle 
//               cx={width - mountingHoles.offset} 
//               cy={height - mountingHoles.offset} 
//               r={mountingHoles.radius} 
//             />
//           </>
//         } */}