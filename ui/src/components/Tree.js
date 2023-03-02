import { useState, useEffect } from 'react'

// import { fetchTreeNodeChildren } from '../api/notion/notion'
import TreeNode from './TreeNode'

const fetchNode = (node, callback) =>
  fetch(process.env.REACT_APP_API_URL + `/notion/tree/${node.type}/${node.id}`, { method: 'GET' })
    .then(d => d.json())
    .then(node => {
      const cleaned = { ...node }
      cleaned.children = node.children.map(child => child.id)

      callback(prev => ({
        ...prev,
        [node.id]: cleaned
      }))

      node.children.forEach(child => fetchNode(child, callback))
    })

/**
 * * will construct an associative tree
 * * tree structure will be flat, and have children arrays containing the ID of each of the element's valid children
 * * I've already done the hard work of figuring out how to filter out valid tree node children for each element
 * * now, just need to fetch objects by ID and datatype and write them to the tree object as they come back.
 * TODO: in /api/tree -- accept by ID and fetch all valid children -- then send them back in object, kind of like [ { id: 'abc123-wree', type: 'page' }]
 * TODO: then map node.children to return
 */
const NotionTree = ({ root }) => {
  // create the root node and set it as initial state
  const [notionTree, setNotionTree] = useState({})
  // TODO: variable to track whether or not a tree is fully loaded -- store in local state
  // * might want to keep track of non-fully-loaded children to pick reconstruction back up
  
  useEffect(() => {
    fetchNode(root, setNotionTree)
  }, [root])

  useEffect(() => {
    console.log('notion Tree: ', notionTree)
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