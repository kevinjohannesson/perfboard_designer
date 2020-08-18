import React, { ReactElement } from 'react'
import { copperPadDiameter, holeDiameter } from './CONSTANTS'
import { useSelector } from 'react-redux'
import { get__view, get__board } from '../redux/reducers/board/selectors'

export default function CopperPads(): ReactElement {

  const view = useSelector(get__view)
  
  const board = useSelector(get__board)

  return (
    <>
      {
        Object.values(board.grid.points).map((pt, i) => (
          <circle 
            key = { i }
            cx = { pt.location.back.x }
            cy = { pt.location.back.y }
            r = { copperPadDiameter / 2 }
            strokeWidth = {(copperPadDiameter - holeDiameter) }

            fill = 'rgba(0,0,0,0)'
            stroke = '#e3aa80'

            style = {{
              display: view === 'back' ? '' : 'none',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
            }}
          />
        ))
      }
    </>
  )
}
