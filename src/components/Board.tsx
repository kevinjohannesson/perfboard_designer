import React, { ReactElement, useEffect } from 'react'
// import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getScale, getZoom } from '../redux/reducers/app/selectors'
import Connection from './Connection'
import { get__width, get__height, get__grid, get__connections, get__headers } from '../redux/reducers/board/selectors'
import { setup__board } from '../redux/reducers/board/actions'
// import { I_state } from '../redux/reducers/board/initialState'
import Paper from './Paper'
import Pad from './Pad'

import DrilledHoles from './DrilledHoles'
import Header from './Header'
import ConnectionPoint from './ConnectionPoint'
import ConnectionPoints from './ConnectionPoints'
import ConnectionLines from './ConnectionLines'

interface Props {
  
}

// hardcoded values:
const h_width = 70
const h_height = 50

const h_rows = 18
const h_columns = 24

const h_pitch = 2.54

export default function Board(): ReactElement {
  const dispatch = useDispatch()
  // Selectors:
  //  App:
  const scale = useSelector(getScale)
  const zoom = useSelector(getZoom)
  //  Board:
  // const points = useSelector(get__points)
  
  // board specifications. units in mm:
  const width = useSelector(get__width)
  const height = useSelector(get__height)

  const grid = useSelector(get__grid)

  // const rows = useSelector(get__rows)
  // const columns = useSelector(get__columns)
  
  // const pitch = useSelector(get__pitch)

  const connections = useSelector(get__connections)

  const headers = useSelector(get__headers)
  // console.log(headers)
  const maskID = 'myMask'
  
  useEffect(() => {
    dispatch(setup__board(
      {
        height: h_height,
        width: h_width,
        pitch: h_pitch,
        rows: h_rows,
        columns: h_columns,
      }
    ))

  }, [dispatch])

  // useEffect(() => {
  //   const points = ([] as I_state['points']).concat(...Array.from({length: 24}, (undef, x_index) => ( 
  //     Array.from({length:18},(undef, y_index)=> (
  //       { 
  //       //   location: {
  //           x: x_index * pitch, 
  //           y: y_index * pitch,
  //       //   },
  //       //   connections: [], 
  //       //   header: false,
  //       //   socket: false,
  //       })
  //     )
  //   )))

  //   dispatch(create__points(points))
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [pitch, dispatch])
  // 0.75 = 2.1 - 1.35 

  // 1.35 = 2.1 - 0.75

  // (copperPadDiameter - holeDiameter) * 2

  // const componentHoles = ([] as I_Vector[]).concat(...Array.from({length: 24}, (undef, x_index) => ( 
  //   Array.from({length:18},(undef, y_index)=> (
  //     { x: x_index * pitch, y: y_index * pitch })
  //   )
  // )))

  // const grid_offset = {
  //   top: ( height - ((rows - 1) * pitch) ) / 2,
  //   left: ( width - ((columns -1) * pitch) ) / 2,
  // }

  // const grid = {
  //   height: height - ( grid_offset.top * 2 ), 
  //   width: width - ( grid_offset.left * 2 )
  // }

  // console.log(offset)
  
  // console.log(componentHoles)

  // const connections: any = [];

  // const [connections, set_connections] = useState<I_Vector[]>([])




  // const handleClick = (e: React.MouseEvent) => {
  //   switch(tool){
  //     case 'connection': {
  //       console.log('toolclick')
  //       console.log(e.currentTarget.getAttribute('data-ptnum'))
  //       const ptnum = e.currentTarget.getAttribute('data-ptnum')
  //       if(ptnum !== null){
  //         if(current_ptnum !== null){
  //           console.log('hallo')
  //           // componentHoles[current_ptnum].connections.push(parseInt(ptnum))
  //           dispatch( add__connection( parseInt(ptnum) ) )
  //         }
  //         // set_connections( [...connections, componentHoles[parseInt(ptnum)]])
  //         // connections.push( componentHoles[parseInt(ptnum)])
  //         // console.log(connections)
  //         dispatch( set__current_ptnum( parseInt(ptnum) ) )
          
  //       }
  //       break;
  //     }
  //     case 'header': {
  //       const ptnum = e.currentTarget.getAttribute('data-ptnum')
  //       if(ptnum !== null){
  //         dispatch( create__header( parseInt(ptnum) ) )
  //       }
  //     }
  //     default: {
  //       console.log('click')
  //     }
  //   }
  // }

  //@ts-ignore
  return (
    width && height && 
      <svg
        viewBox={`0 0 ${width} ${height}`} 
        height={(height*scale)*zoom} 
        width={(width*scale)*zoom}
      >
      <DrilledHoles maskID = {maskID} />
      <Paper maskID = {maskID} />

     
      { grid && 
        <svg
          viewBox = { `0 0 ${grid.width} ${grid.height}`}
          height = { grid.height }
          width = { grid.width } 
          x = { grid.offset.left }
          y = { grid.offset.top }
          style = {{overflow: 'visible'}}
        >
          {/* alphabetical indexing for columns: */}
          {[...Array(h_columns)].map((x, i) =>
            <text 
              key= {i} 
              x={i * (h_pitch) - (h_pitch/4)}  
              y= {-h_pitch/2} 
              textLength={grid.width / h_columns - (h_pitch/2)} 
              lengthAdjust='spacingAndGlyphs'
              style={{fontSize: 2, fill: 'white'}}
          >{ (i+10).toString(36).toUpperCase() }</text>
          )}
          {/* numerical indexing for rows:  */}
          {[...Array(h_rows)].map((x, i) =>
            <text 
              key = {i} 
              x = {-h_pitch} 
              y = {i * (h_pitch) + (h_pitch/4)}  
              textLength={grid.width / h_columns - (h_pitch/2)} 
              lengthAdjust='spacingAndGlyphs'
              style={{fontSize: 2, fill: 'white' }}
            >{(i < 10 ? '0' : '') + i}</text>
          )}
          
          {
            grid.points.map( ( pt, i ) => 
              <Pad 
                key = { i } 
                location = { { x: pt.x, y: pt.y } }
                ptnum = { i }
              />
            )
          }

          {/* {
            connections.map( connection => 
              connection.connectedPoints.map( ( pt, i ) => 
                <React.Fragment key = { i }>
                  <Connection
                    start = {{x: grid.points[connection.ptnum].x, y: grid.points[connection.ptnum].y}}
                    end = {{x: grid.points[pt].x, y: grid.points[pt].y}}
                    color = {connection.color}
                  />
                </React.Fragment> 
              )
            )
          } */}
            <ConnectionLines />
            <ConnectionPoints />
          {/* {
            connections.map( connection => 
              <ConnectionPoint />
            )
          } */}

          {
            headers.map( ( header, i) => (
              <Header 
                key = { i } 
                {...header}
              />
            ))
          }

        </svg>
      }
    </svg>
    

    
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