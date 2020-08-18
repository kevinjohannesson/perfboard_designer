import React, { ReactElement } from 'react'

import { useSelector } from 'react-redux'

import { get__board, get__view } from '../redux/reducers/board/selectors'


export default function Indexing(): ReactElement {
  
  const view = useSelector(get__view)

  const board = useSelector(get__board)

  return (
    <>
      {/* alphabetical indexing for columns: */}
      {[...Array(board.grid.columns)].map((x, i) =>
        <text 
          key= {i} 
          x={i * (board.grid.pitch) - (board.grid.pitch/4)}  
          y= {-board.grid.pitch/2} 
          textLength={board.grid.width / board.grid.columns - (board.grid.pitch/2)} 
          lengthAdjust='spacingAndGlyphs'
          style={{fontSize: 2, fill: 'white'}}
        >
          { 
            view === 'back' ? 
              (i+10).toString(36).toUpperCase() : 
              (36-(i+3)).toString(36).toLocaleUpperCase() 
          }
        </text>
      )}
      {/* numerical indexing for rows:  */}
      {[...Array(board.grid.rows)].map((x, i) =>
        <text 
          key = {i} 
          x = {view === 'back' ? -board.grid.pitch : board.grid.width+board.grid.pitch/2} 
          y = {i * (board.grid.pitch) + (board.grid.pitch/4)}  
          textLength={board.grid.width / board.grid.columns - (board.grid.pitch/2)} 
          lengthAdjust='spacingAndGlyphs'
          style={{fontSize: 2, fill: 'white' }}
        >{(i < 10 ? '0' : '') + i}</text>
      )}
    </>
  )
}
