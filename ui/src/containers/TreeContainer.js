import React, { useEffect, useState } from 'react'

import NotionTree from '../components/NotionTree'

import { fetchBlock } from '../api/notion/notion'

const TreeContainer = ({ setElementMap }) => {
  const [block, setBlock] = useState({})

  const root = { id: "workspace", type: "database" }

  useEffect(() => {
    const getBlock = async () => {
      const b = await fetchBlock("0c22fdd9-4a6d-453b-ac86-dded128acc90")
      setBlock(b)
    }
    getBlock()
  }, [])
  useEffect(() => console.log("block", block), [block])

  return (
    <div>
      <h1>Tree</h1>
      <NotionTree root={root} setElementMap={setElementMap} />
    </div>
  )
}

export default TreeContainer