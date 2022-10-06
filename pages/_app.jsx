import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../common/store/index'
import { useStore } from 'react-redux'
import { ChakraProvider, Flex, createStandaloneToast } from '@chakra-ui/react'
import 'moment/locale/id'
import '../styles/globals.css'
import { Router } from 'next/router'
import { useState } from 'react'
import { CircleSpinner } from 'react-spinners-kit'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
import Fonts from '@/lib/Font'
import theme from '@/lib/Theme'


const WrappedApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false)
  const { ToastContainer } = createStandaloneToast()
  const store = useStore()


  Router.events.on('routeChangeStart', () => {
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setLoading(false)
  })

  return (
    <PersistGate persistor={store.__persistor}>
      <ChakraProvider theme={theme}>
        <Fonts />
        {loading ? (
          <Flex h="100vh" alignItems="center" justifyContent="center">
            <CircleSpinner size={70} color="#1EA59A" loading={true} />
          </Flex>
        ) : (
          <>
            <Component {...pageProps} />
            <ToastContainer/>
          </>
        )}
      </ChakraProvider>
    </PersistGate>
  )
}

export default wrapper.withRedux(WrappedApp)
