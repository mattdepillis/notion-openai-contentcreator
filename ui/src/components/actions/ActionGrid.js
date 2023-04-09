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
    <GridContainer>
      <StyledHeading>Suggested Actions</StyledHeading>
      <SimpleGrid className={`grid grid-${columns}`} spacing={5}>
        {gridActions.slice(0, numRowsToShow * columns).map(action => (
          <ActionCard action={action} key={action.id} />
        ))}
      </SimpleGrid>
      <button onClick={changeRowsShown}>{
        numRowsToShow === 1 ? ("Show More") : ("Hide")
      }</button>
    </GridContainer>
  )
}

export default ActionGrid