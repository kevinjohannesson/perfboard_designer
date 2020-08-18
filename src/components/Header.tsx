import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__grid, get__pitch, get__view, get__headers } from '../redux/reducers/board/selectors'
import { T_header } from '../redux/reducers/board/initialState'

export default function Header(): ReactElement {
  return <></>
}
//   const view = useSelector(get__view)


//   const grid = useSelector(get__grid)
//   const pitch = useSelector(get__pitch)


//   const headers = useSelector(get__headers)
  
//   const handleClick = () => {
//     console.log('-Header: ')
//     // console.log(' ptnum: ', ptnum)
//     // console.log(' type: ', type)
//   }

//   const header_arr: any[] = grid ? headers.filter(header => {
//       const pt = grid.points.find(p => p.ptnum === header.ptnum)
//       if(pt) return {...pt, ...header}
//   }) : []

//   console.log(header_arr)

//   return (
//     <>
//       { pitch && 
//         header_arr.map(header => (
//           ( header.type === 'male' ) ? 
//             <>
//               <rect 
//                 x = { header.x - (pitch / 2) + (0.025 * pitch)}
//                 y = { header.y - (pitch / 2) + (0.025 * pitch)}
//                 width = { (pitch - (0.05 * pitch) ) }
//                 height = { (pitch - (0.05 * pitch) ) }
//                 fill="black"
//                 style = {{clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'}}
//                 onClick = {handleClick}
//               />
//               <rect 
//                 x = { header.x - (pitch / 2) + (0.35 * pitch)}
//                 y = { header.y - (pitch / 2) + (0.35 * pitch)}
//                 width = { (0.30 * pitch) }
//                 height = { (0.30 * pitch) }
//                 fill = { 'rgba(200,200,200,1)'}
//                 style = {{pointerEvents: 'none'}}
//               />
//             </> : 
//             <>
//               <rect 
//                 x = { header.x - (pitch / 2) }
//                 y = { header.y - (pitch / 2) }
//                 width = { pitch }
//                 height = { pitch }
//                 onClick = {handleClick}
//                 fill="black"
//               />
//               <rect 
//                 x = { header.x - (pitch / 2) + (0.25 * pitch)}
//                 y = { header.y - (pitch / 2) + (0.25 * pitch)}
//                 width = { (0.50 * pitch) }
//                 height = { (0.50 * pitch) }
//                 fill = { 'rgba(50,50,50,1)'}
//                 style = {{pointerEvents: 'none'}}
//               />
//             </>
//         ))
//       }
//       {/* {
//         ( pt && pitch ) ? 
//           ( type === 'male' ) ? 
//             <>
//               <rect 
//                 x = { pt.x - (pitch / 2) + (0.025 * pitch)}
//                 y = { pt.y - (pitch / 2) + (0.025 * pitch)}
//                 width = { (pitch - (0.05 * pitch) ) }
//                 height = { (pitch - (0.05 * pitch) ) }
//                 fill="black"
//                 // style = {{clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'}}
//                 onClick = {handleClick}
//               />
//               <rect 
//                 x = { pt.x - (pitch / 2) + (0.35 * pitch)}
//                 y = { pt.y - (pitch / 2) + (0.35 * pitch)}
//                 width = { (0.30 * pitch) }
//                 height = { (0.30 * pitch) }
//                 fill = { 'rgba(200,200,200,1)'}
//                 style = {{pointerEvents: 'none'}}
//               />
//             </> : 
//             <>
//               <rect 
//                 x = { pt.x - (pitch / 2) }
//                 y = { pt.y - (pitch / 2) }
//                 width = { pitch }
//                 height = { pitch }
//                 onClick = {handleClick}
//                 fill="black"
//               />
//               <rect 
//                 x = { pt.x - (pitch / 2) + (0.25 * pitch)}
//                 y = { pt.y - (pitch / 2) + (0.25 * pitch)}
//                 width = { (0.50 * pitch) }
//                 height = { (0.50 * pitch) }
//                 fill = { 'rgba(50,50,50,1)'}
//                 style = {{pointerEvents: 'none'}}
//               />
//             </>
//           : null 
//       } */}
//     </>
//   )
// }
