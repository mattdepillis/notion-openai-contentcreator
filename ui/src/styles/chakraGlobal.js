import { extendTheme } from '@chakra-ui/react'

export const extendedGlobalTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      },
    },
  },
})