import React, { ReactElement } from 'react'
import { I_Vector } from './Container'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getScale, getZoom } from '../redux/reducers/app/selectors'

interface Props {
  
}

export default function Board({}: Props): ReactElement {
  // viewport scale:
  // const scale = 10

  const scale = useSelector(getScale)
  const zoom = useSelector(getZoom)

  // board specifications. units in mm:
  const width = 70
  const height = 50
  const mountingHoleEdgeDistance = 2.5
  const mountingHoleRadius = 1

  const pitch = 2.54
  const holeDiameter = 0.75
  const copperPadDiameter = 2.1


  // 0.75 = 2.1 - 1.35 

  // 1.35 = 2.1 - 0.75

  // (copperPadDiameter - holeDiameter) * 2

  const componentHoles = ([] as I_Vector[]).concat(...Array.from({length: 24}, (undef, x_index) => ( 
    Array.from({length:18},(undef, y_index)=> (
      { x: x_index * pitch, y: y_index * pitch })
    )
  )))

  const offset = {
    top: ( height - (17 * pitch) ) / 2,
    left: ( width - (23 * pitch) ) / 2,
  }

  console.log(offset)
  
  console.log(componentHoles)


  const handleClick = () => {console.log('click')}
  return (
    <svg 
      viewBox="0 0 70 50" 
      height={(height*scale)*zoom} 
      width={(width*scale)*zoom} 
      style={{boxShadow: '0px 0px 25px -1px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0,0,0,0.05)'}}
    >
      <mask id="myMask">
      {/* unmasked base: */}
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      {/* mounting holes: */}
      <circle cx={mountingHoleEdgeDistance} cy={mountingHoleEdgeDistance} r={mountingHoleRadius} />
      <circle cx={width - mountingHoleEdgeDistance} cy={mountingHoleEdgeDistance} r={mountingHoleRadius}/>
      <circle cx={mountingHoleEdgeDistance} cy={height - mountingHoleEdgeDistance} r={mountingHoleRadius} />
      <circle cx={width - mountingHoleEdgeDistance} cy={height - mountingHoleEdgeDistance} r={mountingHoleRadius} />
      {/* component holes: */}
      {componentHoles.map( (vector, i) => 
        <circle
          key = { i }
          cx = { offset.left + vector.x }
          cy = { offset.top + vector.y }
          r = { holeDiameter }
        />
      )}
      
      </mask>
      {/* board: */}
      <rect x="0" y="0" width="100%" height="100%" stroke="#855d44" strokeWidth="0.5" fill="#e0aa6f" mask="url(#myMask)" 
        
      />
      
      {/* component holes: */}
      {componentHoles.map( (vector, i) => 
        <React.Fragment key={i}>
        {/* copper pad: */}
        {/* <PAD 
          x = { offset.left + vector.x - ( copperPadDiameter / 2 ) } 
          y = { offset.top + vector.y - ( copperPadDiameter / 2 )} 
          width = { copperPadDiameter } 
          height = { copperPadDiameter } 
        /> */}
        
        <PAD
          cx={ offset.left + vector.x }
          cy={ offset.top + vector.y }
          r={ copperPadDiameter / 2 }
          
          strokeWidth={(copperPadDiameter - holeDiameter) * 2}
          

          onClick={handleClick}
        />
        {/* through hole: */}
        {/* <circle
          cx={ offset.left + vector.x }
          cy={ offset.top + vector.y }
          r={ holeDiameter / 2 }
          fill="white"
          stroke="#e0aa6f"
          strokeWidth="0.1"

          style={{pointerEvents: 'none'}}
        />   */}
        
        </React.Fragment>
      )}
      
    </svg>
  )
}

const PAD = styled.circle`
  fill: rgba(0,0,0,0);
  stroke: #f9e3ce;

  clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);

  &:hover {
    stroke: gold;
  }
`
// const PAD = styled.circle`
//   clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
//   fill: #f9e3ce;
// `

