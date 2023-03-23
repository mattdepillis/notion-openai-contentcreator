import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const SearchBar = () => {
  // future state for filtering search results here

  return (
    <InputGroup>
      <Input placeholder='Search for pages and databases...' />
      <InputRightElement children={<AddIcon />} />
    </InputGroup>
  )
}

export default SearchBar