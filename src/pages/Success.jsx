import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useStateContext } from '../lib/ContextApi'

export default function Success() {
  const { setBagItems } = useStateContext()
  useEffect(() => {
    setBagItems([])
  }, [setBagItems])
  return (
    <div
      className='container-lg container-lg-md mx-auto px-2'
      style={{ marginTop: '5rem' }}
    >
      <h1 className='text-center text-lg-start text-sm fs-3 py-5'>
        Thank you for your order!
      </h1>
      <address className='mt-5'>
        If you have any questions, please email{' '}
        <a href='mailto:reactclass@example.com'>
          <span className='text-success'> order@estore.com</span>
        </a>
        .<br />
        Visit us at:
        <br />
        Somewhere around the world
        <br />
        TechStudio, Onipanu
        <br />
        Lagos
      </address>
      <Link to='/'>
        <Button
          className='p-2 text-white bg-black text-xs border-none rounded-0'
          variant='outline-dark'
        >
          CONTINUE SHOPPING
        </Button>
      </Link>
    </div>
  )
}
