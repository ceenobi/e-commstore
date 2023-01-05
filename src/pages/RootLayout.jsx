import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navhead from '../components/Navhead'

export default function RootLayout() {
  return (
    <>
      <Navhead />
      <Outlet />
      <Footer/>
    </>
  )
}
