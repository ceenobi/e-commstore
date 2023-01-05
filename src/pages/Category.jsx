import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import useFetchApi from '../hooks/useFetchApi'

export default function Category() {
  const { data } = useFetchApi('https://ecommtest.onrender.com/categories')
  const location = useLocation()
  return (
    <div
      className='container-lg container-lg-md '
      style={{ marginTop: '7rem' }}
    >
      <div className='d-flex align-items-center justify-content-center'>
        {data?.slice(0, 6).map((category) => (
          <Link
            to={`/category/${category.id}`}
            className='mx-2'
            key={category.id}
          >
            <p
              className={
                location.pathname === `/category/${category.id}`
                  ? 'fw-bold text-black'
                  : 'text-sm text-secondary'
              }
            >
              {category.name.toUpperCase()}
            </p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
