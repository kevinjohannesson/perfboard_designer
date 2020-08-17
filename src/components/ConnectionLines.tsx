import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__connections, get__grid } from '../redux/reducers/board/selectors'
import { wireColorName } from './CONSTANTS'

interface Props {
  
}

export default function ConnectionLines({}: Props): ReactElement {
  const connections = useSelector(get__connections)
  const grid = useSelector(get__grid)

  // const lines = ([] as number[][])
  const lines = ([] as {start: number, end: number, color: wireColorName}[])
    .concat( ...connections.map(connection => ( 
        connection.connectedPoints.map( ptnum => ({ start: connection.ptnum, end: ptnum, color: connection.color}))
    ))).filter( (ptnum_set, i, arr) => {
      const index = arr.findIndex( comparison_set => comparison_set.start === ptnum_set.end && comparison_set.end === ptnum_set.start)
      if( index === -1 || index > i ) return ptnum_set
    })
    //     pt.connectedPoints.map((connected_ptnum) => {start: pt.ptnum, end: connected_ptnum})
    // ))).filter( (ptnum_set, i, arr) => {
    //   const index = arr.findIndex( set => set[1] === ptnum_set[0] && set[0] === ptnum_set[1])
    //   if( index === -1 || index > i ) return ptnum_set
    // })

  //  console.log(lines)

  const handleClick = (line: {
    start: number;
    end: number;
    color: wireColorName;
})=>{
    console.log('-Connection:')
    console.log(' line: ', line)
    // console.log(' start: ', start)
    // console.log(' end: ', end)
    // console.log(' color: ', color)
  }
  return (
    <>
      {
        grid && lines.length && 
          lines.map( (line, i) => (

            <line
              key = {i}
              x1={grid.points[line.start].x} 
              y1={grid.points[line.start].y} 
              x2={grid.points[line.end].x}
              y2={grid.points[line.end].y}
              style={{ 
                stroke: line.color, 
                strokeWidth:1,
              }}
            
            strokeLinecap="round"
            
            onClick = {()=>handleClick(line)}
            />
            
            ))
          }
    </>
    // <line
    //   x1={start.x} 
    //   y1={start.y} 
    //   x2={end.x}
    //   y2={end.y}
    //   style={{ 
    //     stroke: color, 
    //     strokeWidth:1,
    //   }}

    //   strokeLinecap="round"

    //   onClick = {handleClick}
    // />
  )
}
