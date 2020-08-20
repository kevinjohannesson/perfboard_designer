import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__tool, get__newHeader, get__grid, get__view } from '../redux/reducers/board/selectors'

interface Props {
  
}

export default function NewHeader({}: Props): ReactElement {
  const tool = useSelector(get__tool)
  const view = useSelector(get__view)
  const header = useSelector(get__newHeader)
  // const pitch = useSelector(get__pitch)
  const grid = useSelector(get__grid)
  const {pitch} = grid

  // console.log(header)
  return (
    <>
    {tool === 'header' && header.ptnum &&
      <rect
        x = {(grid.points[`pt${header.ptnum}`].location[view].x) - (pitch / 2) - (header.width < 0 ? (Math.abs(header.width) - 1) * pitch : 0)}
        y = {grid.points[`pt${header.ptnum}`].location[view].y - (pitch / 2) - (header.height < 0 ? (Math.abs(header.height) - 1) * pitch : 0)}
        width = {Math.abs(header.width) * pitch} 
        height = {Math.abs(header.height) * pitch}
        stroke = 'white'
        strokeWidth = {0.2} 
        fill = 'none'
      > 
    </rect>}
    </>
  )
}
