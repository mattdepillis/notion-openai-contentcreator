import { Button, Card, CardBody, CardHeader, CardFooter, Heading, Text, SimpleGrid } from '@chakra-ui/react'

import { gridActions } from '../../utils/gridActions'

/**
 * 
 * @param {} param0
 * @returns 
 */
const ActionGrid = () => {

  return (
    <SimpleGrid columns={4} spacing={10}>
      {gridActions.map(action => (
        <Card id={action.id}>
          <CardHeader style={{ border: '1px solid red' }}>
            <Heading size='md'>{action.name}</Heading>
          </CardHeader>
          <CardBody>
            <Text>{action.description}</Text>
          </CardBody>
          <CardFooter style={{ border: '1px solid blue' }}>
            <Button>Go!</Button>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default ActionGrid