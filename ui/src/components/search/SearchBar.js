// import module dependencies
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

/**
 * 
 * @param {*} param0
 * @returns 
 */
const SearchBar = ({ setSearchTerm }) =>
  <InputGroup>
    <Input placeholder='Search for pages, databases, and actions...' onChange={e => setSearchTerm(e.target.value)}/>
    <InputRightElement children={<SearchIcon />} />
  </InputGroup>

export default SearchBar