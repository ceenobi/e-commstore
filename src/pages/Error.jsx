import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5 py-5'>
      <div>
        <h1 className='display-4'>Ooops! an error has occurred</h1>
        <Link to='/'>
          <Button variant='outline-dark' className='border-none rounded-0'>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
