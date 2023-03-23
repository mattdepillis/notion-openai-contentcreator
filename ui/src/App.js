import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import AppContainer from './containers/AppContainer'

import { extendedGlobalTheme } from './styles/chakraGlobal'

const App = () => {
  return (
    <ChakraProvider theme={extendedGlobalTheme}>
      <AppContainer />
    </ChakraProvider>
  )
}

export default App
