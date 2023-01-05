import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import {
  Category,
  CategoryId,
  Error,
  Home,
  ProductId,
  Products,
  RootLayout,
  Search,
  Cart,
  Success,
} from '../pages'
import ProtectedRoutes from './ProtectedRoutes'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path='products' element={<Products />}>
        <Route path=':productid' element={<ProductId />} />
      </Route>
      <Route path='category' element={<Category />}>
        <Route path=':categoryid' element={<CategoryId />} />
      </Route>
      <Route path='search' element={<Search />} />
      <Route path='cart' element={<Cart />} />
      <Route
        path='success'
        element={
          <ProtectedRoutes>
            <Success />
          </ProtectedRoutes>
        }
      />
    </Route>
  )
)

export default function Routepath() {
  return <RouterProvider router={router} />
}
