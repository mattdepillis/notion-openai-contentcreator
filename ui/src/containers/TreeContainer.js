import React, { useEffect, useState } from 'react'

import NotionTree from '../components/Tree'

import { fetchBlock } from '../api/notion/notion'

const TreeContainer = () => {
  const [block, setBlock] = useState({})

  const root = { id: "workspace", type: "database" }

  useEffect(() => {
    const getBlock = async () => {
      // const b = await fetchBlock("5aa17d15-364b-411e-af37-068e284f91b8")
      // const b = await fetchBlock("d9e7a543-a995-42e5-879a-0e98f25a473f")
      const b = await fetchBlock("0c22fdd9-4a6d-453b-ac86-dded128acc90")
      setBlock(b)
    }
    getBlock()
  }, [])
  useEffect(() => console.log("block", block), [block])

  return (
    <div>
      <h1>Tree</h1>
      <NotionTree root={root} />
    </div>
  )
}

export default TreeContainer