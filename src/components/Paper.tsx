import React, { ReactElement } from 'react'

interface Props {
  maskID: string,
}

export default function Paper( { maskID }: Props): ReactElement {
  return (
    <rect 
      x="0" 
      y="0" 
      width="100%" 
      height="100%" 
      // stroke="#855d44" 
      // strokeWidth="0.5" 
      fill="#ae7754" 
      mask={`url(#${maskID})`} 
    />
  )
}