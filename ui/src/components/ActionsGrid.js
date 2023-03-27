import { useState, useEffect } from 'react'
import { Card, CardHeader, SimpleGrid } from '@chakra-ui/react'

import TreeNode from './TreeNode'
import { fetchNode } from '../api/notion/notion'

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
    // if the search term === "", pick 4-6 random actions
    console.log('o', Object.keys(elementMap))
    setOptions(Object.entries(elementMap).slice(0, 5))
    console.log(options)
  }, [elementMap])

  return (
    <SimpleGrid>
      {options.length > 0 &&
        options.map(option =>
          <Card>
            <CardHeader>{option[0]}</CardHeader>
          </Card>
        )
      }
      
    </SimpleGrid>
  )
}

export default ActionsGrid