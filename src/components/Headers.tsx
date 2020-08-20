import React, { ReactElement } from 'react'

import { useSelector } from 'react-redux'

import { get__view, get__headers, get__board, get__connections } from '../redux/reducers/board/selectors'


export default function Headers(): ReactElement {
  const view = useSelector(get__view)

  const board = useSelector(get__board)
  
  const headers = useSelector(get__headers)

  const connections = useSelector(get__connections)

  return (
    <>
      { headers.map((header, i) => {
        const { pitch } = board.grid
        const { x, y } = board.grid.points[`pt${header.ptnum}`].location[view]
        const connection = connections.find(connection => connection.ptnum === header.ptnum)
        const {double} = header
        let dX = 0
        let dWidth = 0

        // if(double){
          const leftPt = headers.find(h => h.ptnum === header.ptnum - board.grid.rows && h.double && h.orientation === header.orientation)
          const rightPt = headers.find(h => h.ptnum === header.ptnum + board.grid.rows && h.double && h.orientation === header.orientation)
          const topPt = headers.find(h => h.ptnum === header.ptnum + 1 && h.double && h.orientation === header.orientation)
          const bottomPt = headers.find(h => h.ptnum === header.ptnum - 1 && h.double && h.orientation === header.orientation)

          
          // board.grid.points[`pt${header.ptnum - board.grid.rows}`]
          // if(leftPt)console.log(leftPt)
          // if(rightPt)console.log(rightPt)
          const female = header.type === 'female'
          const vertical = header.orientation === 'vertical'
          const _pitch = pitch / 2


          const nX = ((x - _pitch) + 
            (female ? 
              (vertical ? 
                (0.1 * pitch) +
                  ( double && leftPt ? 
                    -(0.1 * pitch)
                  : 0)
              : 0)
            : (0.025 * pitch))
          )

          const nY = (y - _pitch) + 
            (female ? 
              (vertical ? 
                0 
              : ((0.1 * pitch) + 
              ( double && bottomPt ? 
                -(0.1 * pitch)
              : 0))
              )
            : (0.025 * pitch))

          const nWidth = pitch - 
            (female ? 
              (vertical ? 
                ((0.2 * pitch) - (
                  (double ? 
                    0.1 * pitch
                  : 0)
                ))
              : 0) 
            : (0.05 * pitch))

            const nHeight = pitch - 
              (female ? 
                (vertical ? 
                  0 
                : ((0.2 * pitch)) -
                (double ? 
                  0.1 * pitch
                : 0))
              : (0.05 * pitch))

        return (
          <React.Fragment key = {i}>
            <rect 
              // x = {(x - pitch / 2) + 
              //   (header.type === 'female' ? header.orientation === 'vertical' ? (0.1 * pitch) : 0
              //   : (0.025 * pitch))}
              x = {nX}
              // x = { x - (pitch / 2) + ( header.type === 'female' ? header.orientation === 'vertical' ? double ? (0.1 * pitch)*2 : (0.1 * pitch) : 0 : (0.025 * pitch))}
              y = { nY}
              width = {nWidth}
              // width = { pitch - (header.type === 'female' ? header.orientation === 'vertical' ? (0.2 * pitch) : 0 : (0.05 * pitch)) }
              height = { nHeight }
              fill = {'black'}
              style = {{
                display: header.placement === view ? '' : 'none'
              }}
              // style = {{clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'}}
            />
            {
              header.type === 'male' ? 
                <>
                <rect 
                  x = { x - (pitch / 2) + (0.35 * pitch)}
                  y = { y - (pitch / 2) + (0.35 * pitch)}
                  width = { (0.30 * pitch) }
                  height = { (0.30 * pitch) }
                  fill={ connection ? connection.color : "silver" }
                  style = {{pointerEvents: 'none'}}
                />
                
                </> : 
                <>
                  <rect 
                    x = { x - (pitch / 2) + (0.3 * pitch)}
                    y = { y - (pitch / 2) + (0.3 * pitch)}
                    width = { (0.40 * pitch) }
                    height = { (0.40 * pitch) }
                    fill={ connection ? connection.color : 'rgba(255,255,255,0.2)' }
                    style = {{pointerEvents: 'none', display: header.placement === view ? '' : 'none'}}
                  />
                  
                </>
            }
            <rect 
                    x = { x - (pitch / 2) + (0.35 * pitch)}
                    y = { y - (pitch / 2) + (0.35 * pitch)}
                    width = { (0.30 * pitch) }
                    height = { (0.30 * pitch) }
                    fill = { 'silver'}
                    style = {{pointerEvents: 'none', display: header.placement === view ? 'none' : ''}}
                  />
          </React.Fragment>
        )
      }
    )}
    </>
  )
}



// {grid && pitch && grid.points.map((pt, i) => (

//   //   pt.purpose.type === 'header' && 
//   //   <>
//   //     <rect 
//   //       x = { pt.x - (pitch / 2) + (0.025 * pitch)}
//   //       y = { pt.y - (pitch / 2) + (0.025 * pitch)}
//   //       width = { (pitch - (0.05 * pitch) ) }
//   //       height = { (pitch - (0.05 * pitch) ) }
//   //       fill="black"
//   //       style = {{clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'}}
//   //       // onClick = {handleClick}
//   //       />
//   //   </>
//   // )
//   // )}
//   {/* { pitch && header_arr.map(header => 
//       <rect 
//         x = { header.x - (pitch / 2) + (0.025 * pitch)}
//         y = { header.y - (pitch / 2) + (0.025 * pitch)}
//         width = { (pitch - (0.05 * pitch) ) }
//         height = { (pitch - (0.05 * pitch) ) }
//         fill="black"
//         style = {{clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)'}}
//         // onClick = {handleClick}
//       />
//     )
//   } */}