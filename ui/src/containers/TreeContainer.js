import React from 'react'

// import { fetchTree } from '../api/notion/notion'

import NotionTree from '../components/Tree'

const TreeContainer = () => {

  const root = { id: "workspace", type: "database" }
  // const [rootPages, setRootPages] = useState({})
  
  // useEffect(() => {
  //   const setData = async () => {
  //     const data = await fetchTree()
  //     setRootPages(data)
  //   }
  //   setData()
  // }, [])
  // useEffect(() => {
  //   console.log('notion Tree: ', rootPages)
  // }, [rootPages])
  return (
    <div>
      <p>Tree</p>
      <NotionTree root={root} />
    </div>
  )
}

export default TreeContainer