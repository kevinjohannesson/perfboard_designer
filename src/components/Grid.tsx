import React, { ReactElement, useContext } from 'react'

import styled from 'styled-components';

import { Context } from './Container'
import { useSelector } from 'react-redux';
import { getScale, getZoom } from '../redux/reducers/app/selectors';

interface Props {
  // size: number;
}

export default function Grid({}: Props): ReactElement {
  const container = useContext(Context)
  const scale = useSelector(getScale)
  const zoom = useSelector(getZoom)
  console.log(scale)
  console.log(zoom)


  console.log(container);

  const lines = {
    // axes:
    x: {
      x1: 0, 
      x2: container.width,
      y1: container.height/2,
      y2: container.height/2
    },
    y: {
      x1: container.width/2, 
      x2: container.width/2,
      y1: 0,
      y2: container.height
    },
    // gridlines:
    h: (()=>{
      const arr: any[] = []
      for (let i = container.height/2; i < container.height; i += ( scale * 10 ) * zoom){
        const positiveLine = {
          x1: 0,
          x2: container.width,
          y1: i,
          y2: i
        }
        arr.push(positiveLine)
      }
      for (let i = container.height/2; i > 0; i -= ( scale * 10 ) * zoom){
        const negativeLine = {
          x1: 0,
          x2: container.width,
          y1: i,
          y2: i
        }
        arr.push(negativeLine)
      }

      return arr
    })(),
    v: (()=>{
      const arr: any[] = []
      for (let i = container.width/2; i < container.width; i += ( scale * 10 ) * zoom){
        const positiveLine = {
          x1: i,
          x2: i,
          y1: 0,
          y2: container.height
        }
        arr.push(positiveLine)
      }
      for (let i = container.width/2; i > 0; i -= ( scale * 10 ) * zoom){
        const negativeLine = {
          x1: i,
          x2: i,
          y1: 0,
          y2: container.height
        }
        arr.push(negativeLine)
      }
      return arr
    })(),
  }
  // console.log(lines)
  return (
    <GRID>
      <line {...lines.x} style={{stroke:'rgb(255,0,0)',strokeWidth: 2}} />
      <line {...lines.y} style={{stroke:'rgb(0,255,0)',strokeWidth: 2}} />
      {lines.h.map((line, i) => <line key={i} {...line} style={{stroke: 'rgba(150, 150, 150, 0.5)', strokeWidth: 2}} /> )}
      {lines.v.map((line, i) => <line key={i} {...line} style={{stroke: 'rgba(150, 150, 150, 0.5)', strokeWidth: 2}} /> )}
      <circle cx={container.width/2} cy={container.height/2} r="5" style={{fill: 'rgba(237, 226, 14, 1)'}}/>
    </GRID>
  )
}

const GRID = styled.svg`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  
  background-color: green;
  // background-color: #202125;

  z-index: -1;
`;

