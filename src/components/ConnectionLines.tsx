import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__connections, get__grid, get__view } from '../redux/reducers/board/selectors'
import { wireColorName } from './CONSTANTS'
import { Placement } from '../redux/reducers/board/initialState'



export default function ConnectionLines(): ReactElement {
  const connections = useSelector(get__connections)
  const grid = useSelector(get__grid)

  const view = useSelector(get__view)

  const lines = ([] as {start: number, end: number, color: wireColorName, placement: Placement}[])
    .concat( ...connections.map(connection => ( 
        connection.connectedPoints.map( ptnum => ({ start: connection.ptnum, end: ptnum, color: connection.color, placement: connection.placement}))
    ))).filter( (ptnum_set, i, arr) => {
      const index = arr.findIndex( comparison_set => comparison_set.start === ptnum_set.end && comparison_set.end === ptnum_set.start)
      return index === -1 || index > i
    })

  return (
    <>
      { lines.map( (line, i) => {
          const start = grid.points[`pt${line.start}`]
          const end = grid.points[`pt${line.end}`]

          return (
            <React.Fragment key = {i}>
              { view === line.placement &&
                <line
                  x1 = {start.location[view].x} 
                  y1 = {start.location[view].y} 
                  x2 = {end.location[view].x}
                  y2 = {end.location[view].y}
                  style = {{ 
                    stroke: line.color, 
                    strokeWidth:1,
                  }}
                  
                  strokeLinecap="round"
                  
                  // onClick = {()=>handleClick(line)}
                />
              }
            </React.Fragment>
          )
        })
      }
    </>
  )
}
//   const connections = useSelector(get__connections)
//   const grid = useSelector(get__grid)

//   // const lines = ([] as number[][])
//   const lines = ([] as {start: number, end: number, color: wireColorName}[])
//     .concat( ...connections.map(connection => ( 
//         connection.connectedPoints.map( ptnum => ({ start: connection.ptnum, end: ptnum, color: connection.color}))
//     ))).filter( (ptnum_set, i, arr) => {
//       const index = arr.findIndex( comparison_set => comparison_set.start === ptnum_set.end && comparison_set.end === ptnum_set.start)
//       if( index === -1 || index > i ) return ptnum_set
//     })
//     //     pt.connectedPoints.map((connected_ptnum) => {start: pt.ptnum, end: connected_ptnum})
//     // ))).filter( (ptnum_set, i, arr) => {
//     //   const index = arr.findIndex( set => set[1] === ptnum_set[0] && set[0] === ptnum_set[1])
//     //   if( index === -1 || index > i ) return ptnum_set
//     // })

//   //  console.log(lines)

//   const handleClick = (line: {
//     start: number;
//     end: number;
//     color: wireColorName;
// })=>{
//     console.log('-Connection:')
//     console.log(' line: ', line)
//     // console.log(' start: ', start)
//     // console.log(' end: ', end)
//     // console.log(' color: ', color)
//   }
//   return (
//     <>
//       {
//         grid && lines.length && 
//           lines.map( (line, i) => {
//               const start = grid.points.find(point => point.ptnum === line.start)
//               const end = grid.points.find(point => point.ptnum === line.end)
//               return (
//                 <React.Fragment key = {i}>
//                   {
//                     start && end && 
//                     <line
                      
//                       x1={start.x} 
//                       y1={start.y} 
//                       x2={end.x}
//                       y2={end.y}
//                       style={{ 
//                         stroke: line.color, 
//                         strokeWidth:1,
//                       }}
                      
//                       strokeLinecap="round"
                      
//                       onClick = {()=>handleClick(line)}
//                       />
//                   }
//                 </React.Fragment>
//               )
//             }
            
//             )
//           }
//     </>
//     // <line
//     //   x1={start.x} 
//     //   y1={start.y} 
//     //   x2={end.x}
//     //   y2={end.y}
//     //   style={{ 
//     //     stroke: color, 
//     //     strokeWidth:1,
//     //   }}

//     //   strokeLinecap="round"

//     //   onClick = {handleClick}
//     // />
//   )
// }



// {/* <>
            
// <line
//   key = {i}
//   x1={grid.points[line.start].x} 
//   y1={grid.points[line.start].y} 
//   x2={grid.points[line.end].x}
//   y2={grid.points[line.end].y}
//   style={{ 
//     stroke: line.color, 
//     strokeWidth:1,
//   }}
  
//   strokeLinecap="round"
  
//   onClick = {()=>handleClick(line)}
//   />
//   </> */}