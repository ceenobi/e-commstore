import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Outlet, useLocation } from 'react-router-dom'
import { ProductContainer } from '../components'
import useFetchApi from '../hooks/useFetchApi'
import Spinner from '../utils/Spinner'

export default function Products() {
  const { error, data, loading } = useFetchApi(
    'https://ecommtest.onrender.com/products'
  )
  const location = useLocation()

  return (
    <div
      className='container-lg container-lg-md '
      style={{ marginTop: '5rem' }}
    >
      {location.pathname === '/products' ? (
        <>
          {loading && <Spinner />}
          {(error || data) && (
            <>
              <h1 className='mt-md-5 py-3 mb-md-4 fs-4'>Products</h1>
              {error && <p className='text-sm'>{error.message}</p>}
              {data && (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
                >
                  <Masonry gutter='30px'>
                    {data.map((product) => (
                      <ProductContainer key={product.id} {...product} />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              )}
            </>
          )}
        </>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
