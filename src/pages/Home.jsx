import React from 'react'
import { FeatureProducts, HeroCategory, HeroProduct } from '../components'
import useFetchApi from '../hooks/useFetchApi'
import Spinner from '../utils/Spinner'

export default function Home() {
  const { error, data, loading } = useFetchApi('https://ecommtest.onrender.com/products')
  
  return (
    <>
      {loading && <Spinner />}
      <HeroProduct error={error} data={data} />
      <HeroCategory />
      <FeatureProducts error={error} data={data} />
    </>
  )
}
