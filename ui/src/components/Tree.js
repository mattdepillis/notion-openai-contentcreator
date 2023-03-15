import { useState, useEffect } from 'react'

import TreeNode from './TreeNode'
import { fetchNode } from '../api/notion/notion'

/**
 * < comments about associative tree here >
 */
const NotionTree = ({ root }) => {
  // create the root node and set it as initial state
  const [notionTree, setNotionTree] = useState({})
  // TODO: variable to track whether or not a tree is fully loaded -- store in local state
  // * might want to keep track of non-fully-loaded children to pick reconstruction back up
  
  useEffect(() => {
    const currentTree = sessionStorage.getItem('tree')
    if (currentTree === null) fetchNode(root, setNotionTree)
    else setNotionTree(JSON.parse(currentTree))
  }, [root])

  useEffect(() => {
    console.log('notion Tree: ', notionTree)
    sessionStorage.setItem('tree', JSON.stringify(notionTree))
  }, [notionTree])

  return (
    <div>
      {notionTree[root.id] && 
        <TreeNode tree={notionTree} node={notionTree[root.id]} />
      }
    </div>
    
  )
}

export default NotionTree