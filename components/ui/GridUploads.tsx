import React from 'react'
import FileUpload from './FileUpload'
import TextUpload from './TextUpload'
import GridItem from './GridItem'

export default function GridUploads() {
  return (
    <div className="grid grid-cols-2 gap-y-10 gap-x-4 p-4">
        <GridItem size="large" title="Upload Text or File" desc="Use the options below to upload your text or file."/>
        {/*<TextUpload />*/}
        <FileUpload />
    </div>
  )
}
