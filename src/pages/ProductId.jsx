import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { formatCurrency } from '../utils/formatCurrency'
import Spinner from '../utils/Spinner'
import { useStateContext } from '../lib/ContextApi'
import useFetch from '../hooks/useFetchApi'

export default function ProductId() {
  const [index, setIndex] = useState(0)
  const { productid } = useParams()
  const { error, data, loading } = useFetch(
    `https://ecommtest.onrender.com/products/${productid}`
  )
  const { data: dataProducts } = useFetch(
    'https://ecommtest.onrender.com/products'
  )

  const { increaseBagQuantity } = useStateContext()

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' })
  }, [productid])

  const relatedProduct = dataProducts?.filter(
    (product) => product.category?.name === data.category?.name
  )

  const filterProductId = relatedProduct?.filter((item) => item?.id !== data.id)

  const addToCart = () => {
    increaseBagQuantity(data.id)
    toast.success(`${data.title} added to Bag`)
  }

  return (
    <div className='container-lg container-lg-md'>
      {loading && <Spinner />}
      {(error || data) && (
        <Row className='mt-5 g-4 h-100'>
          {error && <p className='text-center mt-5'>{error.message}</p>}
          <Col lg={8}>
            <div className='d-lg-flex align-items-center gap-4 h-100'>
              <div className='mb-4 align-self-end gap-2'>
                <h6 className='text-start text-uppercase text-sm font-bold'>
                  {data.title}
                </h6>
                <p className='text-uppercase text-sm font-bold'>
                  {data.category?.name}
                </p>
              </div>
              <div className='d-lg-flex mb-4 adjustImg'>
                <Image
                  src={data.images && data.images?.[index]}
                  alt={data.title}
                  className='object-fill w-100 h-100'
                />
              </div>
              <div className='d-flex flex-lg-column align-self-start'>
                {data.images?.map((image, i) => (
                  <div key={i}>
                    <Image
                      src={image}
                      onMouseEnter={() => setIndex(i)}
                      style={{ width: '70px', height: '70px' }}
                      className={i === index ? 'border border-dark' : ''}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className='d-lg-flex align-items-center gap-4 h-100'>
              <div className='mb-4 align-self-end gap-2'>
                <h6 className='text-sm font-bold'>description</h6>
                <p className='text-secondary text-sm'>{data.description}</p>
                <p className='text-sm text-secondary'>
                  {formatCurrency(data.price)}
                </p>
                <Button
                  variant='dark'
                  className='border-none rounded-0 w-100'
                  onClick={addToCart}
                >
                  ADD TO BAG
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <div style={{ marginTop: '3.5rem' }}>
        <h6 className='text-start text-sm text-black font-bold'>
          similar items
        </h6>
        <div className='mt-5 d-flex overflow-auto gap-4 w-100 scrollbody'>
          {filterProductId?.map((item) => (
            <div className='flex-shrink-0' key={item.id}>
              <Link to={`/products/${item.id}`}>
                <div style={{ width: '270px', height: '350px' }}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className='w-100 h-100'
                  />
                </div>
              </Link>
              <p className='text-sm text-black mb-0'>{item.title}</p>
              <p className='text-sm text-black-50 mb-0'>
                {formatCurrency(item.price)}
              </p>
              <Button
                variant='outline-dark'
                className='border-none rounded-0'
                onClick={addToCart}
              >
                ADD TO BAG
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
