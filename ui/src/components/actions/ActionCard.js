import { Button, Card, CardBody, CardHeader, CardFooter, Heading, Text } from '@chakra-ui/react'

/**
 * 
 * @param {} param0
 * @returns 
 */
const ActionCard = ({ action }) =>
  <Card id={action.id}>
    <CardHeader style={{ border: '1px solid red' }}>
      <Heading size='md'>{action.name}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{action.description}</Text>
    </CardBody>
    <CardFooter style={{ border: '1px solid blue' }}>
      <Button
        colorScheme='facebook'
        leftIcon={action.icon}
        style={{ width: 'fit-content', margin: 'auto' }}
      >
        {action.buttonText}
      </Button>
    </CardFooter>
  </Card>

export default ActionCard