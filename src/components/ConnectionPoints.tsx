import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__connections, get__grid } from '../redux/reducers/board/selectors'
import { holeDiameter } from './CONSTANTS'

interface Props {
  
}

export default function ConnectionPoints({}: Props): ReactElement {
  
  const connections = useSelector(get__connections)
  
  const grid = useSelector(get__grid)

  return (
    <>
      {  
        grid && 
        connections.map( (connection, i) => {
          const endpoint = connection.connectedPoints.length <= 1
          
          return (
            <circle 
              key = { i }
              r={ endpoint ? holeDiameter / 2 : 0.5}
              cx={grid.points[connections[i].ptnum].x} 
              cy={grid.points[connections[i].ptnum].y}
              fill = {endpoint ? 'silver' : connection.color}
              stroke = { endpoint ? connection.color : 'none'  }
              strokeWidth = {0.4}
            />
          )
        })
      }
    </>
  )
}
