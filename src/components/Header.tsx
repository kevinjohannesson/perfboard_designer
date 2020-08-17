import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { get__points, get__pitch } from '../redux/reducers/board/selectors'
import { T_header } from '../redux/reducers/board/initialState'

export default function Header({ptnum, type}: T_header): ReactElement {
  const points = useSelector(get__points)
  const pitch = useSelector(get__pitch)
  
  const handleClick = () => {
    console.log('-Header: ')
    console.log(' ptnum: ', ptnum)
    console.log(' type: ', type)
  }
  return (
    <>
      {
        ( points && pitch ) ? 
          ( type === 'male' ) ? 
            <>
              <rect 
                x = { points[ptnum].x - (pitch / 2) + (0.025 * pitch)}
                y = { points[ptnum].y - (pitch / 2) + (0.025 * pitch)}
                width = { (pitch - (0.05 * pitch) ).toString() }
                height = { (pitch - (0.05 * pitch) ).toString() }
                style = {{clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'}}
                onClick = {handleClick}
              />
              <rect 
                x = { points[ptnum].x - (pitch / 2) + (0.35 * pitch)}
                y = { points[ptnum].y - (pitch / 2) + (0.35 * pitch)}
                width = { (0.30 * pitch).toString() }
                height = { (0.30 * pitch).toString() }
                fill = { 'rgba(200,200,200,1)'}
                style = {{pointerEvents: 'none'}}
              />
            </> : 
            <>
              <rect 
                x = { points[ptnum].x - (pitch / 2) }
                y = { points[ptnum].y - (pitch / 2) }
                width = { pitch.toString() }
                height = { pitch.toString() }
                onClick = {handleClick}
              />
              <rect 
                x = { points[ptnum].x - (pitch / 2) + (0.25 * pitch)}
                y = { points[ptnum].y - (pitch / 2) + (0.25 * pitch)}
                width = { (0.50 * pitch).toString() }
                height = { (0.50 * pitch).toString() }
                fill = { 'rgba(50,50,50,1)'}
                style = {{pointerEvents: 'none'}}
              />
            </>
          : null 
      }
    </>
  )
}
