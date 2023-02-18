import React, { Fragment, useState, useEffect } from 'react'

import { fetchNotionData } from './api/notion/notion'

const Cont = () => {
  const [notionData, setNotionData] = useState([])

  useEffect(() => {
    const setData = async () => {
      const data = await fetchNotionData()
      setNotionData(data)
    }
    setData()
  }, [])
  useEffect(() => {
    console.log('notionData: ', notionData)
  }, [notionData])
  return (
    <Fragment>
      {notionData &&
        (notionData.map(item => <p>{item.properties.title.title[0].plain_text}</p>))
      }
      <p> here's cont</p>
      </Fragment>
  )
}

export default Cont