import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routepath from './Routes/Routepath'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Toaster } from 'react-hot-toast'
import { StateContext } from './lib/ContextApi'

function App() {
  return (
    <>
      <StateContext>
        <PayPalScriptProvider deferLoading={true}>
          <Toaster />
          <Routepath />
        </PayPalScriptProvider>
      </StateContext>
    </>
  )
}

export default App
