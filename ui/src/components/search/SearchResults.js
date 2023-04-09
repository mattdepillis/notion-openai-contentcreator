import { useState, useEffect } from 'react'
import { Card, CardHeader, SimpleGrid } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

import { filterKeysByLevenshteinDistance } from '../../utils/search'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const SearchResults = ({ elementMap, searchTerm }) => {
  // need state variables
  const [options, setOptions] = useState([])

  // TODO: delete this?
  useEffect(() => {
    setOptions(Object.entries(elementMap).slice(0, 5))
  }, [elementMap])

  useEffect(() => {
    /*
      - filter keys by LD from the search term and take the 5 or fewer closest
      - map elements to an array of [name, blockId]
    */
    if (searchTerm.length > 0) {
      const st = searchTerm.toLowerCase()
      const partialMatches = filterKeysByLevenshteinDistance(elementMap, st, 2).slice(0, 5)
      const elements = partialMatches.map(match => [match[0], elementMap[match]])
      setOptions(elements)
    } else setOptions(Object.entries(elementMap).slice(0, 5))
  }, [elementMap, searchTerm])

  return (
    <SimpleGrid>
      {options.length > 0 &&
        options.map(option =>
          <Card key={option[1]}>
            <CardHeader>{option[0]}</CardHeader>
          </Card>
        )
      }
      {(options.length === 0 && searchTerm.length > 0) &&
        <Card key='no-results-found'>
          <CardHeader>{<WarningIcon />} {"Your search term doesn't match any results"}</CardHeader>
        </Card>
      }
    </SimpleGrid>
  )
}

export default SearchResults