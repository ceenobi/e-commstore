import React from 'react'
import { useParams } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { ProductContainer } from '../components'
import Spinner from '../utils/Spinner'
import useFetch from '../hooks/useFetchApi'

export default function CategoryId() {
  const { categoryid } = useParams()
  const { error, data, loading } = useFetch(
    `https://ecommtest.onrender.com/categories/${categoryid}/products`
  )

  return (
    <div
      className='container-lg container-lg-md '
      style={{ paddingTop: '2rem' }}
    >
      {loading && <Spinner />}
      {(error || data) && (
        <>
          {error && <p className='text-center'>{error.message}</p>}
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
    </div>
  )
}
