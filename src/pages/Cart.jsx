import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { BagItem } from '../components'
import Checkout from '../components/Checkout'
import useFetch from '../hooks/useFetchApi'
import { useStateContext } from '../lib/ContextApi'
import { formatCurrency } from '../utils/formatCurrency'
import Spinner from '../utils/Spinner'

export default function Cart() {
  const { error, loading, data } = useFetch(
    'https://ecommtest.onrender.com/products'
  )
  const { bagItems } = useStateContext()
  const getTotal = bagItems?.reduce((total, bagItem) => {
    const totalItem = data.find((i) => i.id === bagItem?.id)
    return total + (totalItem?.price || 0) * bagItem.quantity
  }, 0)

  if (loading) {
    return <Spinner />
  }

  return (
    <div
      className='container-lg container-lg-md '
      style={{ paddingTop: '5rem' }}
    >
      {bagItems.length ? (
        <h6 className='text-start text-sm font-bold'>
          CART ({bagItems.length})
        </h6>
      ) : (
        <h6 className='text-center text-sm font-bold d-flex justify-content-center align-items-center py-5'>
          your basket is empty
        </h6>
      )}

      {/* {loading && <Spinner />} */}
      {(error || data) && (
        <div className='h-100'>
          {error && <p className='text-lg text-center'>{error.message}</p>}
          <>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              className='mx-auto'
            >
              <Masonry gutter='30px'>
                {bagItems.map((item, index) => (
                  <BagItem key={index} {...item} data={data} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </>
          <div className='py-2 d-flex justify-content-end flex-column align-items-end mt-2'>
            <Checkout getTotal={getTotal} />
            <div className='d-flex gap-3 font-bold text-xs align-items-center'>
              <span>TOTAL</span>
              <span className='me-3 fs-3'>{formatCurrency(getTotal)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
