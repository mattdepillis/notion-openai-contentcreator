import React, { useState, useEffect } from 'react'
import { Container, Avatar, AvatarBadge } from '@chakra-ui/react'

import { fetchUsers } from '../api/notion/notion'

import { Name, WelcomeContainer } from '../styles/AppContainerStyles'

const AppContainer = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const setData = async () => {
      const data = await fetchUsers()
      setUser(data)
    }
    setData()
  }, [])

  useEffect(() => {
    console.log('user', user)
  }, [user])
  return (
    <Container maxW='90%'>
      {user &&
        <WelcomeContainer>
          <Avatar src={user.avatar_url} size='2xl' border='2px solid #38A169'>
            <AvatarBadge boxSize='1em' bg='green.500' borderColor='green.100' />
          </Avatar>
          <Name>Welcome, <strong>{user.name}</strong></Name>
        </WelcomeContainer>
      }
    </Container>
  )
}

export default AppContainer