import { SimpleGrid } from '@chakra-ui/react'

import ActionCard from './ActionCard'

import { gridActions } from './gridActions'

/**
 * 
 * @param {} param0
 * @returns 
 */
const ActionGrid = () => {
  return (
    <SimpleGrid columns={4} spacing={5}>
      {gridActions.map(action => (
        <ActionCard action={action} />
      ))}
    </SimpleGrid>
  )
}

export default ActionGrid