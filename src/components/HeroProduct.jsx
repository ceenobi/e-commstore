import React from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HeroProduct({ data, error }) {
  const heroProduct = data.filter((product) => product.price >= 500)
  return (
    <>
      {(error || heroProduct) && (
        <>
          {error && <p className='text-center mt-5'>{error.message}</p>}
          <Carousel fade>
            {heroProduct?.slice(0,3).map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  src={item.images[2]}
                  alt={item.title}
                  className='d-block w-100 img-fluid'
                  style={{ height: '600px', objectFit:'inherit' }}
                />
                <Carousel.Caption>
                  <h1 className='display-3'>{item.title}</h1>
                  <Link to={`/products/${item.id}`}>
                    <Button
                      variant='dark'
                      className='border-none rounded-0'
                      size='lg'
                    >
                      BUY NOW
                    </Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  )
}
