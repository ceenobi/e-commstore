import React, { useEffect, useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Spinner from '../utils/Spinner'
import { Button } from 'react-bootstrap'
import { useStateContext } from '../lib/ContextApi'

export default function Checkout({ getTotal }) {
  const [openPayment, setOpenPayment] = useState(false)
  const { isAuthenticated } = useAuth0()
  const { bagItems } = useStateContext()
  const navigate = useNavigate()
  const amount = getTotal
  const currency = 'USD'
  const style = { layout: 'vertical' }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <>
        {showSpinner && isPending && <Spinner />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              toast.success('Payment successfull')
              navigate('/success')
            })
          }}
        />
      </>
    )
  }
  return (
    <>
      {isAuthenticated && bagItems.length > 0 ? (
        <>
          {openPayment ? (
            <PayPalScriptProvider
              options={{
                'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
                components: 'buttons',
                currency: 'USD',
                'disable-funding': 'credit,card,p24',
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          ) : (
            <Button
              className='p-2 text-white bg-black text-xs mb-2 border-none rounded-0'
              variant='outline-dark'
              onClick={() => setOpenPayment(true)}
            >
              Continue payment
            </Button>
          )}
        </>
      ) : (
        <>
          {isAuthenticated ? (
            <p className='text-sm text-secondary mt-4'>
              Pls <span className='text-dark mx-1'>Add items</span>to continue
              purchase
            </p>
          ) : (
            <p className='text-sm text-secondary mt-4'>
              Pls <span className='text-dark mx-1'>sign in </span>to continue
              purchase
            </p>
          )}
        </>
      )}
    </>
  )
}
