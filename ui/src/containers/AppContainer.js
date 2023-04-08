import React, { useState, useEffect } from 'react'
import { Container, Avatar, AvatarBadge } from '@chakra-ui/react'

import { fetchUsers } from '../api/notion/notion'

import { Name, WelcomeContainer } from '../styles/AppContainerStyles'

// containers
// TODO: delete OpenAI container; setup client in ~/api
import OpenAIContainer from './OpenAIContainer'
import TreeContainer from './TreeContainer'

import ActionGrid from '../components/actions/ActionGrid'

// search components
import SearchBar from '../components/search/SearchBar'
import SearchResults from '../components/search/SearchResults'

const AppContainer = () => {
  // state mapping for application user
  const [user, setUser] = useState(null)
  // state mapping for element map (formatted block name -> block id)
  const [elementMap, setElementMap] = useState({})
  // state mapping for search term values
  const [searchTerm, setSearchTerm] = useState("")
  // TODO state mapping for action
  // const [action, setAction] = useState("")
  

  useEffect(() => {
    // set the elementMap with init value -- useful if in same session
    const currentMap = sessionStorage.getItem('elementMap') || "{}"
    setElementMap(JSON.parse(currentMap))

    const setData = async () => {
      const data = await fetchUsers()
      setUser(data)
    }
    setData()
  }, [])

  return (
    <Container maxW='90%'>
      {user &&
        <WelcomeContainer>
          <Avatar src={user.avatar_url} size='xl' border='2px solid #38A169'>
            <AvatarBadge boxSize='1em' bg='green.500' borderColor='green.100' />
          </Avatar>
          <Name>Hello, <strong>{user.name}</strong></Name>
        </WelcomeContainer>
      }
      <SearchBar setSearchTerm={setSearchTerm} />

      {/* ----- ACTION STATE SHOULD TOGGLE DISPLAY ----- */}
      <ActionGrid />
      <br />
      <SearchResults elementMap={elementMap} searchTerm={searchTerm} />
      <TreeContainer setElementMap={setElementMap} />
      <OpenAIContainer />
    </Container>
  )
}

export default AppContainer