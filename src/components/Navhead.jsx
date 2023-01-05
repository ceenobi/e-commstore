import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Twirl as Hamburger } from 'hamburger-react'
import { useAuth0 } from '@auth0/auth0-react'
import { CgShoppingCart } from 'react-icons/cg'
import Navlocker from './Navlocker'
import { useStateContext } from '../lib/ContextApi'

export default function Navhead() {
  const [isOpen, setOpen] = useState(false)
  const { bagQuantity } = useStateContext()
  const location = useLocation()
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className='bg-transparent position-fixed w-100 top-0' style={{ zIndex: '10' }}>
      <div
        className='container-lg container-lg-md d-flex align-items-center justify-content-between p-2'
      >
        <div
          className='d-flex  align-items-center gap-1 gap-md-5'
          style={{ zIndex: '10' }}
        >
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={20}
            direction='right'
            label='Show menu'
          />
          <NavLink to='/' className='fs-1 text-black align-self-center'>
            EStore
          </NavLink>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-2 gap-md-5'>
          {location.pathname !== '/search' && (
            <NavLink
              to='/search'
              className='text-dark text-decoration-underline fw-light mx-3'
            >
              SEARCH
            </NavLink>
          )}
          <div className='d-flex align-items-center gap-3'>
            {isAuthenticated ? (
              <div className='d-flex align-items-center gap-1 gap-md-2'>
                <img
                  src={user?.picture}
                  alt={user.nickname}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '100%',
                  }}
                />
                <p
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className='text-secondary mt-3'
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </p>
              </div>
            ) : (
              <p
                className='text-secondary mt-3'
                onClick={() => loginWithRedirect()}
                style={{ cursor: 'pointer' }}
              >
                LOG IN
              </p>
            )}
            <NavLink to='/cart'>
              <div className='position-relative'>
                <CgShoppingCart size='1.5rem' className='text-secondary' />
                <p className='position-absolute top-0 start-100 translate-middle'>
                  {bagQuantity > 0 ? bagQuantity : 0}
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      {isOpen && <Navlocker isOpen={isOpen} setOpen={setOpen} />}
    </div>
  )
}
