import React from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useFetchApi from '../hooks/useFetchApi'

export default function HeroCategory() {
  const { error, data } = useFetchApi(
    'https://ecommtest.onrender.com/categories'
  )
  const heroCategory = data.filter(
    (category) => category.name === 'Fashion' || category.name === 'Earpiece'
  )
  return (
    <div className='container-lg container-lg-md py-5'>
      {(error || heroCategory) && (
        <>
          {error && <p className='text-center mt-5'>{error.message}</p>}
          <Carousel fade variant='dark'>
            {heroCategory?.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className='d-block w-100'
                  style={{ height: '600px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h1 className='display-3'>{item.name}</h1>
                  <Link to={`/category/${item.id}`}>
                    <Button
                      variant='outline-dark'
                      className='border-none rounded-0'
                    >
                      SEE MORE
                    </Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </div>
  )
}
