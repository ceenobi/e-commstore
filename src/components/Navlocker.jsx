import React from 'react'
import { NavLink } from 'react-router-dom'
import useFetchApi from '../hooks/useFetchApi'

export default function Navlocker({ isOpen, setOpen }) {
  const { error, data } = useFetchApi(
    'https://ecommtest.onrender.com/categories'
  )
  return (
    <div
      className='position-fixed top-0 left-0 h-100 bg-secondary'
      style={{ zIndex: '0', transition: '1s ease-in' }}
    >
      <div
        className='p-4 bg-light h-100'
        style={{ width: '24rem', transition: '0.7s ease-in' }}
      >
        <div style={{ marginTop: '5rem' }}>
          <NavLink to='/products' onClick={() => setOpen(!isOpen)}>
            <p className='text-uppercase text-dark'>products</p>
          </NavLink>
          <p className='text-uppercase'>categories</p>
          {error && <p className='text-sm'>{error.message}</p>}
          {data.map((category) => (
            <NavLink
              to={`/category/${category.id}`}
              key={category.id}
              onClick={() => setOpen(!isOpen)}
            >
              <p className='text-uppercase text-sm mt-2 text-black-50'>
                {category.name}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
