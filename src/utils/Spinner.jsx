import React from 'react'
import { Blocks } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      <Blocks
        visible={true}
        height='80'
        width='80'
        ariaLabel='blocks-loading'
        wrapperStyle={{}}
        wrapperClass='blocks-wrapper'
      />
    </div>
  )
}
