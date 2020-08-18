import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__connections, get__grid, get__view } from '../redux/reducers/board/selectors'
import { holeDiameter } from './CONSTANTS'

export default function ConnectionPoints(): ReactElement {
  
  const connections = useSelector(get__connections)

  const view = useSelector(get__view)
  
  const grid = useSelector(get__grid)
  // const board = useSelector(get__board)

  return (
    <>
      {  
        connections.map( (connection, i) => {
          const endpoint = connection.connectedPoints.length <= 1

          // const pt = grid.points.find(p => p.ptnum === connection.ptnum)
          const pt = grid.points[`pt${connection.ptnum}`]
          const { x, y } = pt.location[view]
          return (
            <circle 
              key = { i }
              r= { endpoint ? holeDiameter / 2 : 0.5}
              cx = {x} 
              cy = {y}
              fill = {endpoint ? 'silver' : 'none'}
              stroke = { endpoint ? connection.color : 'none'  }
              strokeWidth = {0.4}
            />
          )
        })
      }
    </>
  )
}
