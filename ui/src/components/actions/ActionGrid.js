import { SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ActionCard from './ActionCard'

import { gridActions } from './gridActions'

import { StyledHeading } from '../../styles/chakraComponentStyles'

import styled from 'styled-components'


const GridContainer = styled.div`
  .grid {
    display: grid;
  }
  .grid-1 {
    grid-template-columns: repeat(1, 1fr);
  }
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
`

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

  const changeRowsShown = () => {
    const num = numRowsToShow === 1
      ? gridActions.length / columns
      : 1
    console.log(num, columns)
    setNumRowsToShow(num)
  }

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