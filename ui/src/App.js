import React, { Fragment, useState, useEffect } from 'react'

import { fetchNotionData } from './api/notion/notion'

const App = () => {
  const [notionData, setNotionData] = useState(null)

  useEffect(() => {
    const setData = async () => setNotionData(await fetchNotionData())
    setData()
  }, [])
  useEffect(() => console.log('notionData: ', notionData), [notionData])
  return (
    <Fragment>
      {notionData ? <p>{notionData}</p> : <p>Nothing to see here...</p>}
    </Fragment>
  )
}

export default App
