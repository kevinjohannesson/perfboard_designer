import React, { ReactElement, useContext, useCallback, useState, useRef } from 'react'

import styled from 'styled-components';

import { Context } from './Container'

import Point, {I_Point} from './Point';
import { useDispatch } from 'react-redux';
import { setGizmoLocation } from '../redux/reducers/app/actions';

interface Props {
  
}

export default function ObjectLayer({}: Props): ReactElement {
  const dispatch = useDispatch();
  const context = useContext(Context)
  const ref = useRef<HTMLDivElement>(null);
  console.log(context);

  const [points, set_points] = useState<I_Point[]>([]);

  const clickHandler = useCallback(
    function(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
      if(ref.current){

        if( e.target !== ref.current) return;
        
        console.log('hallo');
        console.log(e.clientX, e.clientY);
        const pt = {
          x: e.clientX,
          y: e.clientY
        }
        set_points(p => [...p, pt]);
        dispatch(setGizmoLocation(null))
      }
      },
      [dispatch],
  );


  return (
    <OBJECTLAYER onClick={clickHandler} ref={ref}>
      {points.map((pt, i) => <Point key={i} {...pt}/>)}
    </OBJECTLAYER>
  )
}

const OBJECTLAYER = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
`
