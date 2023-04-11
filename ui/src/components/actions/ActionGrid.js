import { useEffect, useState } from 'react'
import { Button, SimpleGrid } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'

import ActionCard from './ActionCard'

import { gridActions } from './gridActions'

import { ButtonWrapper, GridContainer } from './styles'
import { StyledHeading } from '../../styles/chakraComponentStyles'


/**
 * 
 * @param {} param0
 * @returns 
 */
const ActionGrid = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [numRowsToShow, setNumRowsToShow] = useState(1)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  const getColumns = () => {
    if (width >= 1200) return 4
    if (width >= 768) return 3
    if (width >= 480) return 2
    return 1
  }

  const columns = getColumns()

  const changeRowsShown = () =>
    setNumRowsToShow(
      numRowsToShow === 1 ? (gridActions.length / columns) : 1
    )

  return (
    <GridContainer>
      <StyledHeading>Suggested Actions</StyledHeading>
      <SimpleGrid className={`grid grid-${columns}`} spacing={5}>
        {gridActions.slice(0, numRowsToShow * columns).map(action => (
          <ActionCard action={action} key={action.id} />
        ))}
      </SimpleGrid>
      <ButtonWrapper>
        <Button
          colorScheme={numRowsToShow === 1 ? 'teal' : 'red'}
          leftIcon={numRowsToShow === 1 ? <ArrowDownIcon /> : <ArrowUpIcon />}
          onClick={changeRowsShown}
        >
          {numRowsToShow === 1 ? "More" : "Less"}
        </Button>
      </ButtonWrapper>
    </GridContainer>
  )
}

export default ActionGrid