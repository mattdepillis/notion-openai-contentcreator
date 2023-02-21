import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import Cont from './Cont'
import { extendedGlobalTheme } from './styles/chakraGlobal'

const App = () => {
  return (
    <ChakraProvider theme={extendedGlobalTheme}>
      <Cont />
    </ChakraProvider>
  )
}

export default App
