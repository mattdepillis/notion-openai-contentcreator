import React, { useState, useEffect } from 'react'
import { Container, Spinner, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { fetchNotionData } from './api/notion/notion'

const Cont = () => {
  const [rootPages, setRootPages] = useState([])

  useEffect(() => {
    const setData = async () => {
      const data = await fetchNotionData()
      setRootPages(data)
    }
    setData()
  }, [])
  useEffect(() => {
    console.log('rootPages: ', rootPages)
  }, [rootPages])
  return (
    <Container maxW='90%'>
      <p>Notion Workspace Root Pages</p>
      {rootPages.length > 0 ? (
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            {rootPages.map(page => (
              <Tab key={page.id}>
                {page.icon && page.icon.emoji + ' '}{page.properties.title.title[0].plain_text}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {rootPages.map(page => (
              <TabPanel p={4} key={page.id}>
                {page.icon && page.icon.emoji + ' '}{page.properties.title.title[0].plain_text}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      ) : <Spinner color='red.500' />}
    </Container>
  )
}

export default Cont