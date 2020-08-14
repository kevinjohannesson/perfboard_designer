import React, { ReactElement, useContext } from 'react'

import styled from 'styled-components'

import { Context } from './Container'
import { useSelector } from 'react-redux'
import { getGizmoLocation } from '../redux/reducers/app/selectors'

interface Props {
  
}

export default function Gizmo({}: Props): ReactElement {
  const context = useContext(Context)
  console.log(context)

  const location = useSelector(getGizmoLocation)
  console.log(location)
  // @ts-ignore
  return (
    location ? 
    <CONTAINER style={{top: location.y - 50, left: location.x - 50}}>
      <X viewBox="0 0 512 512">
        <path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068
        c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557
        l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104
        c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"/>
      </X>
      <Y viewBox="0 0 512 512">
        <path d="M374.176,110.386l-104-104.504c-0.006-0.006-0.013-0.011-0.019-0.018c-7.818-7.832-20.522-7.807-28.314,0.002
        c-0.006,0.006-0.013,0.011-0.019,0.018l-104,104.504c-7.791,7.829-7.762,20.493,0.068,28.285
        c7.829,7.792,20.492,7.762,28.284-0.067L236,68.442V492c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V68.442l69.824,70.162
        c7.792,7.829,20.455,7.859,28.284,0.067C381.939,130.878,381.966,118.214,374.176,110.386z"/>
      </Y>
      <CENTERPOINT>
        <circle />
      </CENTERPOINT>
    </CONTAINER> : null
  )
}

const CONTAINER = styled.div`
  height: 100px;
  width: 100px;

  position: absolute;
`
const X = styled.svg`
  height: 50%;
  width: 50%;
  
  position: absolute;
  top: 25%;
  left: 50%;
`

const Y = styled.svg`
  height: 50%;
  width: 50%;

  position: absolute;
  top: 0;
  left: 25%;
`

const CENTERPOINT = styled.svg`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;

  circle {
    r: 10px;
    cx: 50%;
    cy: 50%;
  }
`