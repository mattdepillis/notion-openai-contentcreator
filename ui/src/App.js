import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import AppContainer from './containers/AppContainer'
import TreeContainer from './containers/TreeContainer'
import { extendedGlobalTheme } from './styles/chakraGlobal'

const App = () => {
  return (
    <ChakraProvider theme={extendedGlobalTheme}>
      <AppContainer />
      <TreeContainer />
    </ChakraProvider>
  )
}

export default App
