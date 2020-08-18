import React, { ReactElement, useEffect } from 'react'
// import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getScale, getZoom } from '../redux/reducers/app/selectors'

import { get__width, get__height, get__grid, get__headers, get__view, get__board } from '../redux/reducers/board/selectors'
import { setup__board } from '../redux/reducers/board/actions'
// import { I_state } from '../redux/reducers/board/initialState'
import Paper from './Paper'
import Pad from './Pad'

import DrilledHoles from './DrilledHoles'
import Header from './Header'

import ConnectionPoints from './ConnectionPoints'
import ConnectionLines from './ConnectionLines'
import { I_Vector } from './Container'
import Headers from './Headers'
import Indexing from './Indexing'
import CopperPads from './CopperPads'
import Points from './Points'

import {Pitch, Layer, Board as I_Board, Grid, Point } from './Board.d'
import ConnectionPoint from './ConnectionPoint'



interface Props {
  height: number,
  width: number,
  rows: number,
  columns: number,
  pitch: Pitch,
  layer: Layer
}

// hardcoded values:
const h_width = 70
const h_height = 50

const h_rows = 18
const h_columns = 24

const h_pitch = 2.54

export default function Board(props: Props): ReactElement {
  const dispatch = useDispatch()
  // Selectors:
  //  App:
  const scale = useSelector(getScale)
  const zoom = useSelector(getZoom)
  //  Board:
  const view = useSelector(get__view)
  
  const board = useSelector(get__board)
  // board specifications. units in mm:
  const width = useSelector(get__width)
  const height = useSelector(get__height)

  const grid = useSelector(get__grid)

  // const headers = useSelector(get__headers)
  
  // const maskID = 'myMask'

  useEffect(() => {
    // interface Vector {
    //   x: number,
    //   y: number
    // }
    
    
    const grid: Grid = ( () => {
      const { columns, rows, pitch } = props
      
      const width = ( props.columns - 1 ) * props.pitch
      const height = ( props.rows - 1 ) * props.pitch
      
      const offset = {
        top: ( props.height - height ) / 2,
        left: ( props.width - width ) / 2, 
      }

      const create__index = (column: number, row: number) => (
        (column+10).toString(36).toUpperCase() + row
      )

      const points: {[key: string]: Point} = {}
      for(let c = 0; c < props.columns; c++){
        for(let r = 0; r < props.rows; r++){
          const ptnum = c * props.rows + r
  
          points[`pt${ptnum}`] = {
            row: r,
            column: c,
            ptnum: ptnum,
            index: create__index(c,r),
            location: {
              front: {
                x: c * props.pitch, 
                y: r * props.pitch
              },
              back: {
                x: width - c * props.pitch,
                y: r * props.pitch,
              }
            }
          }
        }
      }
      
      return {
        width,
        height,
        offset,
        columns,
        rows,
        pitch,
        points,
      }
    })()
    
    console.log(grid)
    const { width, height, layer } = props
    const board: I_Board = {
      width,
      height,
      layer,
      grid,
    }
    console.log(board)

    dispatch(setup__board(board))
  }, [])


  
  // useEffect(() => {

  //   const board = {
  //     height: h_height,
  //     width: h_width,
  //     pitch: h_pitch,
  //     rows: h_rows,
  //     columns: h_columns,
  //   }
    
  //   // const newPoints: {[key: string]: any} = {}

    

  //   // for(let c = 0; c < board.columns; c++){
  //   //   for(let r = 0; r < board.rows; r++){
  //   //     const ptnum = c * board.rows + r

  //   //     newPoints[`pt${ptnum}`] = {
  //   //       row: r,
  //   //       column: c,
  //   //       ptnum: ptnum,
  //   //       index: create__index(c,r)
  //   //     }
  //   //   }
  //   // }
  //   // console.log(newPoints)


  //   const points = ([] as I_Vector[]).concat(...Array.from({length: board.columns}, (undef, column) => ( 
  //     Array.from({length:board.rows},(undef, row)=> (
  //       {
  //           x: column * board.pitch, 
  //           y: row * board.pitch,
  //           rowIndex: row,
  //           columnIndex: column,
  //           ptnum: view === 'front' ? (board.columns -1) * board.rows  - (column * board.rows - row) : column * board.rows + row,
            
  //           purpose: { 
  //             type: 'empty'
  //           }
  //           // ptnum: column * board.rows + row
  //       })
  //     )
  //   ))) 
  //   const grid_width = ( board.columns - 1 ) * board.pitch
  //   const grid_height = ( board.rows - 1 ) * board.pitch
  //   const grid = {
  //     points,
  //     offset: {
  //       top: ( board.height - grid_height ) / 2,
  //       left: ( board.width - grid_width ) / 2,
  //     },
  //     width: grid_width,
  //     height: grid_height,
  //   }


  //   dispatch(setup__board(board, grid))

  // }, [view, dispatch])


  return (
    <>
      { board.width && board.height && 
        <svg
          viewBox={`0 0 ${board.width} ${board.height}`} 
          width={(board.width*scale)*zoom}
          height={(board.height*scale)*zoom} 
        >
          <Paper />
          <svg
            viewBox = { `0 0 ${board.grid.width} ${board.grid.height}`}
            height = { board.grid.height }
            width = { board.grid.width } 
            x = { board.grid.offset.left }
            y = { board.grid.offset.top }
            style = {{overflow: 'visible'}}
          >

            <Indexing />
            <CopperPads />
            
            <ConnectionLines />
            <ConnectionPoints />
            <Headers />


            <Points />
            {/* <rect height="100%" width="100%"/> */}
          </svg>
        </svg>
      }
    
    </>
    
  //@ts-ignore
  // return (
  //   width && height && grid && 
  //     <svg
  //       viewBox={`0 0 ${width} ${height}`} 
  //       height={(height*scale)*zoom} 
  //       width={(width*scale)*zoom}
  //     >
  //       <Paper />
  //       <svg
  //         viewBox = { `0 0 ${grid.width} ${grid.height}`}
  //         height = { grid.height }
  //         width = { grid.width } 
  //         x = { grid.offset.left }
  //         y = { grid.offset.top }
  //         style = {{overflow: 'visible'}}
  //       >
  //         <Indexing />
  //         <CopperPads />

  //         <Headers />


  //         <Points />
  //       </svg>

     
      
  //   </svg>
    

    
    // <svg
    //   viewBox={`0 0 ${width} ${height}`} 
    //   height={(height*scale)*zoom} 
    //   width={(width*scale)*zoom} 
    // >
    //   <rect height="100%" width="100%" fill="lightgray"/>

    //   {/* <DrilledHoles /> */}


    //   <Paper 
    //     maskID = 'myMask'
    // //     height = {height}
    // //     width = {width}
    //     // connectionPoints = { points }
    //     // offset = {grid_offset}
    //   />

    //   <svg
    //     x = { grid_offset.left }
    //     y = { grid_offset.top }
    //     width = { grid.width }
    //     height = { grid.height }
    //     viewBox= {`0 0 ${grid.width} ${grid.height}`}
    //     fill = 'darkgray'
    //   >
    //     <rect height="100%" width="100%"/>

    //     {/* <Paper 
    // //     height = {height}
    // //     width = {width}
    // //     connectionPoints = { points }
    // //     offset = {points_offset}
    //     /> */}

    //   </svg>
    // </svg>
    // <WRAPPER>
    //   {/* <Paper 
    //     height = {height}
    //     width = {width}
    //     connectionPoints = { points }
    //     offset = {points_offset}
    //   /> */}
    //   <Pads/>
      
        
      
      
    // {/* <svg 
    //   viewBox={`0 0 ${width} ${height}`} 
    //   height={(height*scale)*zoom} 
    //   width={(width*scale)*zoom} 
    //   style={{boxShadow: '0px 0px 25px -1px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0,0,0,0.05)'}}
    // >
    //   { pads.map( pad => <Pad location = { pad.location }/> ) }
    // </svg> */}
    // </WRAPPER>
  )
}

// const WRAPPER = styled.div`
//   position: relative;
// `

// const PAD = styled.circle<{header: boolean}>`
//   fill: rgba(0,0,0,0);
//   stroke: #f9e3ce;

//   clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
  
//   &:hover {
//     stroke: gold;
//   }
// `


// <svg 
//       viewBox={`0 0 ${width} ${height}`} 
//       height={(height*scale)*zoom} 
//       width={(width*scale)*zoom} 
//       style={{boxShadow: '0px 0px 25px -1px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0,0,0,0.05)'}}
//     >
//       <mask id="myMask">
//         {/* unmasked base: */}
//         <rect x="0" y="0" width="100%" height="100%" fill="white"/>
      
//         {/* drilled mounting holes: */}
//         <circle cx={mountingHoleEdgeDistance} cy={mountingHoleEdgeDistance} r={mountingHoleRadius} />
//         <circle cx={width - mountingHoleEdgeDistance} cy={mountingHoleEdgeDistance} r={mountingHoleRadius}/>
//         <circle cx={mountingHoleEdgeDistance} cy={height - mountingHoleEdgeDistance} r={mountingHoleRadius} />
//         <circle cx={width - mountingHoleEdgeDistance} cy={height - mountingHoleEdgeDistance} r={mountingHoleRadius} />
      
//         {/* drilled component holes: */}
//         {pads.map( (pad, i) => 
//           <circle
//             key = { i }
//             cx = { offset.left + pad.location.x }
//             cy = { offset.top + pad.location.y }
//             r = { holeDiameter/2 }
//           />
//         )}
      
//       </mask>



// {/* {pads.map( (pad, i) => 
//         <PAD
//           key = { i }
//           cx={ offset.left + pad.location.x }
//           cy={ offset.top + pad.location.y }
//           r={ copperPadDiameter / 2 }
          
//           strokeWidth={(copperPadDiameter - holeDiameter) * 2}

//           onClick={handleClick}

//           data-ptnum = {i}

//           header = { pad.header }
//         />
        
//       )}
//       {pads.map( (pad, i) => 
//         pad.header && 
//         <React.Fragment>
//           <rect
//             width= {pitch}
//             height= {pitch}
//             x={ offset.left + pad.location.x - pitch/2}
//             y={ offset.top + pad.location.y - pitch/2}
//           />
//           <circle
//             cx = { offset.left + pad.location.x }
//             cy = { offset.top + pad.location.y }
//             r = { holeDiameter/2 }
//             fill="white"
//           />
//         </React.Fragment>
//       )}
//       {pads.map( (pad, i) => 
//         pad.connections.length && pad.connections.map( ptnum => 
//           <Connection 
//             start = {{
//               x: pad.location.x + offset.left,
//               y: pad.location.y + offset.top
//             }}
//             end = {{
//               x: pads[ptnum].location.x + offset.left,
//               y: pads[ptnum].location.y + offset.top,
//             }}  
//           />
//         )
//       )} */}

      
//       </svg>






// { grid && 
  // <svg
  //   viewBox = { `0 0 ${grid.width} ${grid.height}`}
  //   height = { grid.height }
  //   width = { grid.width } 
  //   x = { grid.offset.left }
  //   y = { grid.offset.top }
  //   style = {{overflow: 'visible'}}
  // >
//     {/* alphabetical indexing for columns: */}
//     {[...Array(h_columns)].map((x, i) =>
//       <text 
//         key= {i} 
//         x={i * (h_pitch) - (h_pitch/4)}  
//         y= {-h_pitch/2} 
//         textLength={grid.width / h_columns - (h_pitch/2)} 
//         lengthAdjust='spacingAndGlyphs'
//         style={{fontSize: 2, fill: 'white'}}
//     >{ view === 'back' ? (i+10).toString(36).toUpperCase() : (36-(i+3)).toString(36).toLocaleUpperCase() }</text>
//     )}
//     {/* numerical indexing for rows:  */}
//     {[...Array(h_rows)].map((x, i) =>
//       <text 
//         key = {i} 
//         x = {view === 'back' ? -h_pitch : grid.width+h_pitch/2} 
//         y = {i * (h_pitch) + (h_pitch/4)}  
//         textLength={grid.width / h_columns - (h_pitch/2)} 
//         lengthAdjust='spacingAndGlyphs'
//         style={{fontSize: 2, fill: 'white' }}
//       >{(i < 10 ? '0' : '') + i}</text>
//     )}
    
//     {
//       view === 'back' && grid.points.map( ( pt, i ) => 
//         <Pad 
//           key = { i } 
//           location = { { x: pt.x, y: pt.y } }
//           ptnum = { pt.ptnum }
//         />
//       )
//     }

//     {/* { view === 'back' && <ConnectionLines /> }
//       <ConnectionPoints /> */}
//     <Headers />

//     {/* {
//       // headers.map( ( header, i) => (
//         <Header 
//           // key = { i } 
//           // {...header}
//         />
//       // ))
//     } */}

//   </svg>
// }