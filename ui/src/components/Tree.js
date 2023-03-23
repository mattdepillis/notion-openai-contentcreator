import { useState, useEffect } from 'react'

import TreeNode from './TreeNode'
import { fetchNode } from '../api/notion/notion'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const NotionTree = ({ root, setElementMap }) => {
  // state variables for notion tree
  const [notionTree, setNotionTree] = useState({})
  // 
  const [blockMap, setBlockMap] = useState({})

  useEffect(() => {
    const currentTree = sessionStorage.getItem('tree')
    if (currentTree === null) fetchNode(root, setNotionTree, {}, setBlockMap)
    else setNotionTree(JSON.parse(currentTree))
  }, [root])

  useEffect(() => {
    // console.log('notion Tree: ', notionTree)
    sessionStorage.setItem('tree', JSON.stringify(notionTree))
  }, [notionTree])

  useEffect(() => {
    // console.log('notion : ', blockMap)
    sessionStorage.setItem('elementMap', JSON.stringify(blockMap))
    setElementMap(blockMap)
  }, [blockMap, setElementMap])

  return (
    <div>
      {notionTree[root.id] && 
        <TreeNode tree={notionTree} node={notionTree[root.id]} />
      }
    </div>
    
  )
}

export default NotionTree