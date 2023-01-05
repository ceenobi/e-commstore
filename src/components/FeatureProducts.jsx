import React, { useContext } from 'react'
import { Image, Button } from 'react-bootstrap'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { formatCurrency } from '../utils/formatCurrency'
import { useStateContext } from '../lib/ContextApi'

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext)
  return (
    <div className='d-flex justify-content-center align-items-center d-none d-md-flex'>
      <AiOutlineArrowLeft
        onClick={() => scrollPrev()}
        className='text-dark'
        size='2.2rem'
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext)
  return (
    <div className='d-flex justify-content-center align-items-center d-none d-md-flex'>
      <AiOutlineArrowRight
        onClick={() => scrollNext()}
        className='text-dark'
        size='2.2rem'
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

export default function FeatureProducts({ data, error }) {
  const { increaseBagQuantity } = useStateContext()
  const featureProducts = data.filter(
    (product) => product.price >= 700 && product.price <= 5000
  )

  return (
    <div className='container-lg container-lg-md py-5 p-3'>
      <h6 className='mt-5 mb-4'>Featured Products</h6>
      {(error || featureProducts) && (
        <>
          {error && <p className='text-center mt-5'>{error.message}</p>}
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{ overflow: 'hidden' }}
            className='scrollbody'
          >
            {featureProducts?.slice(0, 8).map((product) => (
              <div
                style={{ width: '270px' }}
                className='me-4 scrollbody'
                key={product.id}
              >
                <Link to={`/products/${product.id}`}>
                  <div style={{ height: '350px' }} className='w-100'>
                    <Image
                      src={product?.images[0]}
                      alt={product.title}
                      className='w-100 h-100'
                    />
                  </div>
                </Link>
                <p className='text-dark mb-0'>{product.title}</p>
                <p className='text-secondary mb-0'>
                  {formatCurrency(product.price)}
                </p>
                <Button
                  variant='outline-dark'
                  className='border-none rounded-0'
                  onClick={() => {
                    increaseBagQuantity(product.id)
                    toast.success(`${product.title} added to Bag`)
                  }}
                >
                  ADD TO BAG
                </Button>
              </div>
            ))}
          </ScrollMenu>
        </>
      )}
    </div>
  )
}
