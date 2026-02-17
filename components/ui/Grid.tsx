import React from 'react'
import GridItem from './GridItem'


export default function Grid() {
  return (
    <div className="grid grid-cols-3 gap-y-10 gap-x-4 p-4">
        <GridItem size="large" title="Large Grid Item" desc="This is a large grid item with descriptive text."/>
        <GridItem />
        <GridItem />
        <GridItem size="large"/>
    </div>
  )
}
