import { useState, useEffect } from 'react'
import { Card, CardHeader, SimpleGrid } from '@chakra-ui/react'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const ActionsGrid = ({ elementMap, searchTerm }) => {
  // need state variables
  const [options, setOptions] = useState([])

  // going to pass down or manage a list of actions to this component

  // each action should be rendered in a list of cards

  // action filtering depending on search term

  // limit 6 in grid at a time, for example
  useEffect(() => {
    // TODO: 4-6 standard options (READ, ALTER page/db, GENERATE NEW, etc)
    setOptions(Object.entries(elementMap).slice(0, 5))
  }, [elementMap])

  useEffect(() => {
    if (searchTerm.length > 0) {
      /*
        TODO: set up a fuzzy search algorithm to handle this more broadly
        TODO: can try Levenshtein distance algo for this purpose
      */
      const st = searchTerm.toLowerCase()
      // TODO: support to ignore <icon>space if there's a page icon
      // ! might want to refactor the returned title to be just the text
      // ?: have an icon key
      // * then, on display, render icon before the title
      const partialMatches = Object.entries(elementMap).filter(arr => arr[0].toLowerCase().startsWith(st))
      setOptions(partialMatches)
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
      
    </SimpleGrid>
  )
}

export default ActionsGrid