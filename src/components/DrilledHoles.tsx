import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { get__mountingHoles, get__width, get__height, get__grid, get__pitch } from '../redux/reducers/board/selectors'

interface Props {
  maskID: string,
}

export default function DrilledHoles({ maskID }: Props): ReactElement {
  return <></>
}

//   const width = useSelector(get__width)
//   const height = useSelector(get__height)

//   const mountingHoles = useSelector(get__mountingHoles)

//   const grid = useSelector(get__grid)
//   const pitch = useSelector(get__pitch)
//   const holeDiameter = pitch && pitch === 2.54 ? 1.2 : 0.6

//   return (
//     <mask id={maskID}>
      
//       {/* unmasked base: */}
//       <rect x="0" y="0" width="100%" height="100%" fill="white"/>

//       { mountingHoles && width && height &&
//         <>
//           <circle 
//             cx={mountingHoles.offset} 
//             cy={mountingHoles.offset} 
//             r={mountingHoles.radius} 
//           /> 
//           <circle 
//             cx={width - mountingHoles.offset} 
//             cy={mountingHoles.offset} 
//             r={mountingHoles.radius}
//           />
//           <circle 
//             cx={mountingHoles.offset} 
//             cy={height - mountingHoles.offset} 
//             r={mountingHoles.radius} 
//           />
//           <circle 
//             cx={width - mountingHoles.offset} 
//             cy={height - mountingHoles.offset} 
//             r={mountingHoles.radius} 
//           />
//         </>
//       }
 
//       { grid && grid.points.map( (pt, i) => 
//         <circle
//           key = { i }
//           cx = { grid.offset.left + pt.x }
//           cy = { grid.offset.top + pt.y }
//           r = { holeDiameter / 2 }
//         />
//       )}

//     </mask>
//   )
// }
