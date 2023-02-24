import React, { useState, useEffect } from 'react'

import { fetchTree } from '../api/notion/notion'

const AppContainer = () => {
  const [rootPages, setRootPages] = useState(null)

  useEffect(() => {
    const setData = async () => {
      const data = await fetchTree()
      setRootPages(data)
    }
    setData()
  }, [])
  useEffect(() => {
    console.log('notion Tree: ', rootPages)
  }, [rootPages])
  return (
    <p>Tree</p>
  )
}

export default AppContainer