import React, { useState, useEffect } from 'react'
import { Container, Avatar, AvatarBadge } from '@chakra-ui/react'

import { fetchUsers } from '../api/notion/notion'

import { Name, WelcomeContainer } from '../styles/AppContainerStyles'

import SearchBar from '../components/SearchBar'

import TreeContainer from './TreeContainer'

const AppContainer = () => {
  const [user, setUser] = useState(null)

  // state mapping for element map (formatted block name -> block id)
  const [elementMap, setElementMap] = useState({})

  useEffect(() => {
    // set the elementMap with init value -- useful if in same session
    const currentMap = sessionStorage.getItem('elementMap') || {}
    setElementMap(currentMap)

    const setData = async () => {
      const data = await fetchUsers()
      setUser(data)
    }
    setData()
  }, [])

  useEffect(() => {
    console.log('elementMap', elementMap)
  }, [elementMap])

  useEffect(() => {
    console.log('user', user)
  }, [user])
  return (
    <Container maxW='90%'>
      {user &&
        <WelcomeContainer>
          <Avatar src={user.avatar_url} size='xl' border='2px solid #38A169'>
            <AvatarBadge boxSize='1em' bg='green.500' borderColor='green.100' />
          </Avatar>
          <Name>Welcome, <strong>{user.name}</strong></Name>
        </WelcomeContainer>
      }
      <SearchBar />
      <TreeContainer setElementMap={setElementMap} />
    </Container>
  )
}

export default AppContainer