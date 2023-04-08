import { useState, useEffect } from 'react'

import TreeNode from './TreeNode'
import { fetchNode } from '../../api/notion/notion'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const NotionTree = ({ root, setElementMap }) => {
  // state variables for notion tree
  const [notionTree, setNotionTree] = useState({})

  useEffect(() => {
    const currentTree = sessionStorage.getItem('tree')
    if (currentTree === null) fetchNode(root, setNotionTree, setElementMap)
    else setNotionTree(JSON.parse(currentTree))
  }, [root, setElementMap])

  return (
    <div>
      {notionTree[root.id] && 
        <TreeNode tree={notionTree} node={notionTree[root.id]} />
      }
    </div>
  )
}

export default NotionTree